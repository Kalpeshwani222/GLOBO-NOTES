import React, { useState, useEffect } from "react";
import { Button, Card, TextField } from "@mui/material";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import { margin } from "@mui/system";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [uploading, setUploading] = useState(false);

  const [password, setPasssword] = useState("");
  const [confirmPasssword, setConfirmPasssword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const history = useHistory();
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  // uploading image
  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select the image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);

      data.append("upload_preset", "notepad");
      data.append("cloud_name", "kalpesh");
      setUploading(true);

      fetch(" https://api.cloudinary.com/v1_1/kalpesh/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setPic(data.url.toString());
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    } else {
      return setPicMessage("please select an Proper image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <>
      <MainScreen title="Update Profile">
        {/* messages */}
        <div>
          {loading && <Loading />}
          {success && (
            <ErrorMessage variant="success">Updated successfully</ErrorMessage>
          )}
        </div>

        <div className="container">
          <div className="row">

            <div className="col-12 col-md-10 col-lg-10" 
            style={{
              "display":"flex",
              alignItems:"center",
              justifyContent:"center"  
            }}>
              <Card>
                {/* profile Image */}

                <div>
                  {uploading ? (
                    <Loading />
                  ) : (
                    <>
                      <img
                        style={{
                          width: "11rem",
                          height: "10rem",
                          borderRadius:"50%",
                          display:"flex",
                           margin:"auto",
                          padding:"5px"
                        }}
                        src={pic}
                        alt={name}
                        className="profilePic"
                      />
                    </>
                  )}
                  <div className="" style={{
                         display:"flex",
                           margin:"auto",
                          padding:"1rem",
                         justifyContent:"center"
                      }}>
                    <input
                      type="file"
                      onChange={(e) => postDetails(e.target.files[0])}
                      typeof="image/png"
                      style={{
                        display: "none",
                      }}
                      id="contained-button-file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                      
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                </div>

                <div className="" style={{
                  padding:"15px"
                }}>
                  <form onSubmit={submitHandler}>
                    {/* input */}

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                     
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Update
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MainScreen>
    </>
  );
};

export default ProfileScreen;

import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from "react-router-dom";
import {updateProfile} from "../../actions/userActions"
import Loading from "../../components/Loading"

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [uploading,setUploading] = useState(false);

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


  const submitHandler = (e) =>{
    e.preventDefault();

    dispatch(updateProfile({name,email,password,pic}))
  }
  return (
    <>
      <MainScreen title="Edit Profile">
        <div>
          <Row className="profileContainer  ">
            {/* form */}
            <Col md={6} lg={6}>
              Profile
           
            <form onSubmit={submitHandler}>
            {loading && <Loading />}
            {success && (
              <ErrorMessage variant="success">Updated successfully</ErrorMessage>
            )}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPasssword(e.target.value)}
              />

              <br />
              <input
                type="password"
                value={confirmPasssword}
                onChange={(e) => setConfirmPasssword(e.target.value)}
              />
              <br />
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}

              <input
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
                typeof="image/png"
              />
              <br />

              <button type="submit">Update</button>
            </form>
             </Col>

            {/* profile pic */}
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

            {
              uploading ? <Loading / >:   

              <>
                <img 
              style={{
                maxWidth:"30rem",
                maxHeight:"30rem"
              }}
              src={pic} alt={name} className="profilePic" />
              </>
            }
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default ProfileScreen;

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import VerifyEmail from "./screens/VerifyEmail/VerifyEmail";
import ForgotPass from "./screens/forgot-pass/ForgotPass";


const App = () => {
 
  return (
    <BrowserRouter>
      <Header/>

      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/mynotes" component={() => <MyNotes />} />
        <Route path="/createnote" component={() => <CreateNote />} />
        <Route path="/note/:id" component={() => <SingleNote />} />

        <Route path="/profile" component={() => <ProfileScreen />} />
        <Route path="/verify" component={() => <VerifyEmail />} />

        <Route path="/forgot" component={() => <ForgotPass/>} />



      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import LoginForm from "./components/auth/Login/LoginForm";
import SignUpForm from "./components/auth/SignUp/SignUpForm";
import NavBar from "./components/NavBar/index";
import Footer from "./components/Footer/index";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import User from "./components/User";
import Splash from "./components/Splash/index"
import Portfolio from "./components/Portfolio/index"
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  let sessionLinks;
  if(user) {
    sessionLinks = (
      <Portfolio />
    )
  } else {
    sessionLinks = (
      <Splash />
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/" exact={true} >
          {sessionLinks}
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

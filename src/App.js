import React, { useState, Fragment } from "react";
import Login from './components/startingPage/login';
import Register from "./components/startingPage/Register";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <Fragment>
    {!isLoggedIn && (
      <Route path="/login">
      { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
      </Route>
    )}
      <Switch>
        <Route path="/" exact>
       { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
        </Route>
        <Route path="/header">
        <Header />
      </Route>
        <Route path="/resetpassword" exact>
          
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

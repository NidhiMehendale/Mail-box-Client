import React, { useState, Fragment } from "react";
import Login from './components/startingPage/login';
import Register from "./components/startingPage/Register";
import { Route, Switch } from "react-router-dom";



function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          
       { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
        </Route>
        <Route path="/resetpassword" exact>
         
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

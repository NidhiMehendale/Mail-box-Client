import React, { useRef } from "react";
import './login.module.css';
//import { useHistory } from "react-router-dom";


const Login = (props) => {

   // const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEVkPlfQK-SM4hEeowon5dJfy1-npHg0M',
            {
              method: 'POST',
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken :true
              }),
              headers: {
                 'Content-Type' : 'application/json'
              }
            }
        ).then(res => {
        
          if(res.ok){
              return res.json();
          }else{
           return res.json().then(data => {
              let errorMessage = 'Authentication failed';
              if(data && data.error && data.error.message){
                errorMessage = data.error.message;
              }
              
              throw new Error(errorMessage);
            });   
          }
        }).then(data => {
             // authCtx.login(data.idToken);
             console.log("getdata", data); 
             // history.replace(replace);
             window.location.reload();
         
        })
        .catch((err) => {
            alert(err.message)
        });
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input  type="email"  id="email" ref={emailInputRef} required />
                <label htmlFor="password">password</label>
                <input type="password" id="password"  ref={passwordInputRef} required/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}

export default Login;
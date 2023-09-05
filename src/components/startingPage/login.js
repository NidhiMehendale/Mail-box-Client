import React, { useRef } from "react";
import classes  from './login.module.css';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authnetication";

const Login = (props) => {

   const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    
    const dispatch = useDispatch();

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
             console.log("getdata", data); 
             dispatch(authActions.login({ token: data.idToken, email: data.email }))
              history.replace('/header');
             window.location.reload();
         
        })
        .catch((err) => {
            alert(err.message)
        });
    };

    return (
        <section className={classes['auth-form-container']}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input  type="email"  id="email" ref={emailInputRef} required />
            </div>
            <div className={classes.control}>
                <label htmlFor="password">password</label>
                <input type="password" id="password"  ref={passwordInputRef} required/>
                <button className={classes.forgotBtn}>Forgot Password?</button>
            </div>
               
                <div >
                
                <button className={classes['auth-form-btn']}  type="submit">Log In</button>
                </div>
            </form>
            <button className={classes.toogle} onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </section>
    )
}

export default Login;
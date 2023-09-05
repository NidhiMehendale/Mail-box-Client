import React, { useRef } from "react";
import classes from './Register.module.css';

const Register = (props) => {
    const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredconfirmPassword = confirmpasswordInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEVkPlfQK-SM4hEeowon5dJfy1-npHg0M',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmpassword: enteredconfirmPassword,
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
         props.onFormSwitch('login');
     
    })
    .catch((err) => {
        alert(err.message)
    });

        
    }

    return (
        <section className={classes['auth-form-container']}>
            <h2>SignUp</h2>
          <form className="register-form" onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="youremail@gmail.com" id="email" ref={emailInputRef}  required/>
          </div>
          <div className={classes.control}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" ref={passwordInputRef}  required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Confirm password</label>
            <input  type="password" id="cpassword" ref={confirmpasswordInputRef}  required/>
          </div>
           
            <button type="submit">Create Account</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </section>
    )
};

export default Register


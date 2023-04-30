import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const[message,setMessage]=useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function fetchServer(e) {
    e.preventDefault();
    setMessage(true)
    const Email=emailRef.current.value
    const Password=passwordRef.current.value
    if(isLogin){
      console.log('login')
    }else{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8',
        {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: Password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      try {
        setMessage(false)
        if(response.ok){
          console.log(response.json())
        }else{
          throw new Error('EMAIL EXISTS')
        }
      } catch (error) {
        const data=await response.json()
        let msg='ERROR'
        console.log(data)
        if(data&&data.error&&data.error.message)
          msg=data.error.message
          alert(msg)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={fetchServer}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password" >
            Your Password
          </label>
          <input type="password" id="password" required ref={passwordRef}/>
        </div>
        {!message && <button type="submit" >
          {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
        </button>}
        {message && 'Sending request...'}
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

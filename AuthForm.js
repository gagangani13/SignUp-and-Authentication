import { useState, useRef, useContext } from "react";
import UserContext from "../Context/UserContext";

import classes from "./AuthForm.module.css";

const AuthForm = () => {

  const ctx=useContext(UserContext)
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function fetchServer(e) {
    e.preventDefault();
    setMessage(true);
    const Email = emailRef.current.value;
    const Password = passwordRef.current.value;
    let url;
    if (isLogin) {
       url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8";
    } else {
       url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: Email,
        password: Password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    try {
      setMessage(false);
      if (response.ok) {
        // const ID= await data.idToken
        // ctx.idfunction(ID)
        ctx.loginPageFunction(true)
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      let msg = "ERROR";
      console.log(data);
      if (data && data.error && data.error.message) msg = data.error.message;
      alert(msg);
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
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        {!message && (
          <button type="submit">{isLogin ? "LOGIN" : "CREATE ACCOUNT"}</button>
        )}
        {message && "Sending request..."}
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

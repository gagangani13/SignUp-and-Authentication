import React, { useState } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "./UserContext";

const UserProvider = (props) => {

  const [token, setToken] = useState(null);
  
  function idFunctionHandler(ID) {
    setToken(ID);
  }
  const userCtx = {
    Id: token,
    idFunction: idFunctionHandler,
  };
  return (
    <UserContext.Provider value={userCtx}>
      {props.children}
      {token&&
        <Route path='/auth'>
          <Redirect to="/profile" />
        </Route>
      }
      {!token&&
        <Route path='/profile'>
          <Redirect to="/auth" />
        </Route>
      }
    </UserContext.Provider>
  );
};

export default UserProvider;

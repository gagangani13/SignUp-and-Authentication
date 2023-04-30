import React, { useState } from 'react'
import UserContext from './UserContext'

const UserProvider = (props) => {
    const[isLoginPage,setIsLoginPage]=useState(false)
    const[token,setToken]=useState(null)
    function loginPageFunctionHandler() {
        if(isLoginPage){
            setIsLoginPage(false)
        }else{
            setIsLoginPage(true)
        }
    }   
    function idFunctionHandler(ID){
        console.log(ID)
        setToken(ID)
    }
    const userCtx={
       loginPage:isLoginPage,
       loginPageFunction:loginPageFunctionHandler,
       Id:token,
       idFunction:idFunctionHandler
    }
  return (
    <UserContext.Provider value={userCtx}>
        {userCtx.Id}
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider

import  { createContext } from 'react'

const UserContext = createContext({
    loginPage:false,
    loginPageFunction:(login)=>{},
    Id:null,
    idfunction:(id)=>{}
})
export default UserContext

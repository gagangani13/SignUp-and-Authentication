import  { createContext } from 'react'

const UserContext = createContext({
    Id:'',
    idFunction:(id)=>{}
})
export default UserContext

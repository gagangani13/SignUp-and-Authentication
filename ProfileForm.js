import { useContext, useRef } from 'react';
import UserContext from '../Context/UserContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const ctx=useContext(UserContext)
  // const [changePassword]
  const passwordRef=useRef()
  async function submitPassword(e) {
    e.preventDefault()
    const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8',{
      method:'POST',
      body: JSON.stringify({
        idToken: ctx.Id,
        password: passwordRef.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data= await response.json()
    try {
      ctx.idFunction(data.idToken)
      alert('Password updated')
    } catch (error) {
      alert('Password not updated')
    }
  }
  return (
    <form className={classes.form} onSubmit={submitPassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import classes from './MainNavigation.module.css';
import { useContext } from "react";
const MainNavigation = () => {
  const ctx=useContext(UserContext)
  function logoutFunction() {
    ctx.loginPageFunction(false)
    console.log('click');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
          {!ctx.loginPage&&<Link to='/auth'>Login</Link>}
          </li>
          <li>
          {ctx.loginPage&&<Link to='/profile'>Profile</Link>}
          </li>
          <li>
          {ctx.loginPage&&<button onClick={logoutFunction}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

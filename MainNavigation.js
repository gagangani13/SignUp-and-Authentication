import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import classes from './MainNavigation.module.css';
import { useContext } from "react";
const MainNavigation = () => {
  const ctx=useContext(UserContext)
  function logoutFunction() {
    ctx.idFunction(null)
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
          {!ctx.Id&&<Link to='/auth'>Login</Link>}
          </li>
          <li>
          {ctx.Id&&<Link to='/profile'>Profile</Link>}
          </li>
          <li>
          {ctx.Id&&<button onClick={logoutFunction}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      &nbsp; | &nbsp; 
      <Link to="/about">About</Link>
      &nbsp; | &nbsp;
      {user && (
        <>
          <Link to="/organizations/index">View Organizations</Link>
          &nbsp; | &nbsp; 
          {user.role === 'Organization' && (
            <>
              <Link to="/initiatives/create">Create Initiatives</Link>
              &nbsp; | &nbsp; 
              <Link to="/initiatives">Initiatives</Link>
              &nbsp; | &nbsp;
              <Link to="/organizations">Organization Info</Link>
            </>
          )}
          {user.role === 'Volunteer' && (
            <>
              <Link to="/initiatives">Initiatives</Link>
              &nbsp;|&nbsp;
              <Link to="/volunteer">Volunteer Info</Link>
               &nbsp;&nbsp;
            </>
          )}
          <span>Welcome, {user.name}</span>
          &nbsp;&nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      )}
    </nav>
  );
}

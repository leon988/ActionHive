import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="bg-neutral p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link className="text-dark hover:text-primary mx-2" to="/">Home</Link>
          <Link className="text-dark hover:text-primary mx-2" to="/about">About</Link>
          {user && (
            <>
              <Link className="text-dark hover:text-primary mx-2" to="/organizations/index">View Organizations</Link>
              {user.role === 'Organization' && (
                <>
                  <Link className="text-dark hover:text-primary mx-2" to="/initiatives/create">Create Initiatives</Link>
                  <Link className="text-dark hover:text-primary mx-2" to="/initiatives">Initiatives</Link>
                  <Link className="text-dark hover:text-primary mx-2" to="/organizations">Organization Info</Link>
                </>
              )}
              {user.role === 'Volunteer' && (
                <>
                  <Link className="text-dark hover:text-primary mx-2" to="/initiatives">Initiatives</Link>
                  <Link className="text-dark hover:text-primary mx-2" to="/volunteer">Volunteer Info</Link>
                </>
              )}
            </>
          )}
        </div>
        {user && (
          <div>
            <span className="text-secondary mr-4">Welcome, {user.name}</span>
            <Link className="bg-primary text-white px-4 py-2 rounded hover:bg-dark" to="" onClick={handleLogOut}>Log Out</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

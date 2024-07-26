import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const Navigation = () => {
  const isAuthenticated = useStore(({ isAuthenticated }) => isAuthenticated);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated ? (
          <li>
            <Link to="login">Login</Link>
          </li>
        ) : (
          <li>
            <Link to="profile">Profile</Link>
          </li>
        )}
        <li>
          <Link to="register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

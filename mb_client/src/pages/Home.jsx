import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const isAdmin = Number(localStorage.getItem('role'));
  const currentUser = localStorage.getItem('token') ? true : false;
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8000/api/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      window.location.reload();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const email = localStorage.getItem('email');

  return (
    <div>
      <h1>Welcome Home!</h1>
      {currentUser && <p>Email: {email}</p>}
      {currentUser &&<button onClick={handleLogout}>Logout</button>}
      {isAdmin === 1 && <Link to="/admin">Go to Admin Panel</Link>}
      {!currentUser && (
        <>
          <Link to="/login">Login</Link> <br />
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}

export default Home;

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      navigate('/home', { state: { email } });
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          {errors.name && <span>{errors.name[0]}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          {errors.email && <span>{errors.email[0]}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {errors.password && <span>{errors.password[0]}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
      <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;

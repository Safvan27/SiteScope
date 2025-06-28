
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../types';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: USER_ROLES.CLIENT
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  
  // Mock user database - replace with actual API call
  const mockUsers = [
    {
      id: 1,
      email: 'admin@construction.com',
      password: 'admin123',
      role: USER_ROLES.ADMIN,
      name: 'Admin User'
    },
    {
      id: 2,
      email: 'supervisor@construction.com',
      password: 'super123',
      role: USER_ROLES.SUPERVISOR,
      name: 'John Smith'
    },
    {
      id: 3,
      email: 'client@construction.com',
      password: 'client123',
      role: USER_ROLES.CLIENT,
      name: 'Jane Doe'
    }
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Mock authentication - replace with actual API call
      const user = mockUsers.find(
        u => u.email === credentials.email && 
             u.password === credentials.password &&
             u.role === credentials.role
      );
      
      if (user) {
        login({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        });
      } else {
        setError('Invalid credentials or role selection');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Construction Tracker Login</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              required
            >
              <option value={USER_ROLES.CLIENT}>Client</option>
              <option value={USER_ROLES.SUPERVISOR}>Supervisor</option>
              <option value={USER_ROLES.ADMIN}>Admin</option>
            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Admin:</strong> admin@construction.com / admin123</p>
          <p><strong>Supervisor:</strong> supervisor@construction.com / super123</p>
          <p><strong>Client:</strong> client@construction.com / client123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

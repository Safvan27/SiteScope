
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../types';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  
  // Function to detect role from email
  const detectRoleFromEmail = (email) => {
    const emailLower = email.toLowerCase();
    
    // Admin detection - emails starting with 'admin'
    if (emailLower.startsWith('admin@')) {
      return USER_ROLES.ADMIN;
    }
    
    // Supervisor detection - emails starting with 'supervisor' or 'super'
    if (emailLower.startsWith('supervisor@') || emailLower.startsWith('super@')) {
      return USER_ROLES.SUPERVISOR;
    }
    
    // Client detection - default for all other emails
    return USER_ROLES.CLIENT;
  };
  
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
      // Auto-detect role from email
      const detectedRole = detectRoleFromEmail(credentials.email);
      
      // Mock authentication - replace with actual API call
      const user = mockUsers.find(
        u => u.email === credentials.email && 
             u.password === credentials.password &&
             u.role === detectedRole
      );
      
      if (user) {
        login({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        });
      } else {
        setError('Invalid email or password');
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
          <p><em>Role is automatically detected from email prefix</em></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

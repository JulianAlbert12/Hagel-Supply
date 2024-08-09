import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import styles from '../../styles/Login.module.css';
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/'); // Redirect to the home page after successful login
      })
      .catch((error) => {
        console.log(error);
      });

    // Example: You can check the value of 'rememberMe' and store it in localStorage or a cookie
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }

    // Reset the form after the login attempt
    setEmail('');
    setPassword('');
  };

  // Check if 'rememberMe' value is stored in localStorage
  // and set the initial value accordingly
  React.useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMeValue);
  }, []);



  return (
    <div className={styles['login-container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className={styles['login-form-checkbox']}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Remember Me
          </label>
          <span className={styles['login-form-forgot-password']}>
            <Link to="/forgot-password">Forgot Password</Link>
          </span>
        </div>
        <button type="submit">Login</button>
        <div className={styles['login-form-links']}>
          <p className={styles['login-form-account-text']}>
            Don't have an account?
          </p>
          <span className={styles['login-form-signup-link']}>
            <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;

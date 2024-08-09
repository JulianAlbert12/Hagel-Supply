import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import styles from '../../styles/Login.module.css';
import { auth } from "../../firebase";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/'); // Redirect to the home page after successful signup
      })
      .catch((error) => {
        console.log(error);
      });


    // Example: You can store the user's full name, email, and password in a database

    // Reset the form after signup attempt
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
        <h2>Create Account</h2>
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
        </div>
        <button type="submit">Sign Up</button>
        <div className={styles['login-form-links']}>
          <p className={styles['login-form-account-text']}>
            Have an account?
          </p>
          <span className={styles['login-form-signup-link']}>
            <Link to="/account">Sign In</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;

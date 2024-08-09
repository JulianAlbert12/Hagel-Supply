import React, { useState } from 'react';
import styles from '../../styles/Login.module.css'; 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle forgot password submission logic here
    // Send a password reset email to the user's email address

    // Reset the form after submission
    setEmail('');
  };

  return (
    <div className={styles['login-container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

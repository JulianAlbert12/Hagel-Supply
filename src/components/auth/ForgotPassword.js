import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate the email address before proceeding
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Password reset email sent successfully');
      } else {
        alert('Failed to send password reset email');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('An error occurred while sending the password reset email');
    }

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

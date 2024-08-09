import React from 'react';
import styles from '../styles/Help.module.css';

const Help = () => {
  const handleContactUs = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.helpContainer}>
      <p className={styles.helpText}>
        Don't see what you want?{' '}
        <span className={styles.contactLink} onClick={handleContactUs}>
          Give us a call to make sure.
        </span>
      </p>
    </div>
  );
};

export default Help;

import React, { useState } from 'react';
import styles from '../styles/UpdateMessage.module.css';

const UpdateMessage = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    visible && (
      <div className={styles.overlay} onClick={handleClose}>
        <div className={styles.updateMessage} onClick={handleClose}> {/* Update here */}
          <p className={styles.retroHeading}>We updated our website!</p>
          <p className={styles.closeHint}>Click anywhere to close</p>
        </div>
      </div>
    )
  );
};

export default UpdateMessage;

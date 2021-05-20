import React from 'react';
import styles from './styles.module.css';

const Verification = () => {
  return (
    <div className={styles.confirmed}>
      <div className={styles.confirmed_wrapper}>
        <div className={styles.confirmed_email_wrapper}>
          <p className={styles.confirmed_text}>
            Необходимо подтвердить вашу почту
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;

import React, { useState } from 'react';
import styles from './styles.module.css';
const PasswordItem = ({ handleChange, showPas }) => {
  return (
    <li className={styles.item}>
      <span className={styles.setting}></span>
      <p>Facebook</p>
      <label>
        <input
          type={showPas ? 'text' : 'password'}
          name="password"
          value="qwerty"
        />
        {showPas ? (
          <span onClick={handleChange} className={styles.show}></span>
        ) : (
          <span onClick={handleChange} className={styles.show_active}></span>
        )}
      </label>
    </li>
  );
};

export default PasswordItem;

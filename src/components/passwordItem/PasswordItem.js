import React, { useState } from 'react';
import styles from './styles.module.css';
const PasswordItem = ({ name, password, id, login, handleModal }) => {
  const [showPas, setShowPas] = useState(false);

  const handleChange = () => {
    setShowPas(prev => !prev);
  };
  return (
    <li className={styles.item}>
      <span className={styles.setting} onClick={() => handleModal(id)}></span>
      <p>{name}</p>
      <p className={styles.login}>{login}</p>
      <label>
        <input
          readOnly
          type={showPas ? 'text' : 'password'}
          name="password"
          value={password}
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

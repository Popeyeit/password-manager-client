import React, { useState } from 'react';
import styles from './styles.module.css';
const PasswordItem = ({ name, password, id, login, handleModal }) => {
  const [showPas, setShowPas] = useState(false);

  const handleChange = () => {
    setShowPas(prev => !prev);
  };

  const hidePas = lengthPas => {
    let pas = '';
    for (let index = 0; index < lengthPas; index++) {
      pas = `${pas}*`;
    }
    return pas;
  };
  return (
    <li className={styles.item}>
      <span className={styles.setting} onClick={() => handleModal(id)}></span>
      <p className={styles.title}>{name}</p>
      <p className={styles.login}>{login}</p>
      {showPas ? (
        <div className={styles.password_active}>
          {password}
          <span onClick={handleChange} className={styles.show}></span>
        </div>
      ) : (
        <div className={styles.password}>
          {hidePas(password.length)}
          <span onClick={handleChange} className={styles.show_active}></span>
        </div>
      )}
    </li>
  );
};

export default PasswordItem;

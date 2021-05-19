import React from 'react';
import Item from '../passwordItem/PasswordItem';
import styles from './styles.module.css';

const PasswordList = ({ data, handleModal }) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {data.map(password => (
          <Item key={password.id} {...password} handleModal={handleModal} />
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;

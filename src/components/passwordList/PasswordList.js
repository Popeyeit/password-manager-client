import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Item from '../passwordItem/PasswordItem';
import styles from './styles.module.css';

const PasswordList = ({}) => {
  const [showPas, setShowPas] = useState(false);

  const handleChange = () => {
    setShowPas(prev => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <Item showPas={showPas} handleChange={handleChange} />
        <Item showPas={showPas} handleChange={handleChange} />
        <Item showPas={showPas} handleChange={handleChange} />
        <Item showPas={showPas} handleChange={handleChange} />
        <Item showPas={showPas} handleChange={handleChange} />
      </ul>
    </div>
  );
};

export default PasswordList;

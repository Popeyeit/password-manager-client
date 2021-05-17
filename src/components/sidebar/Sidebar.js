import React from 'react';
import CreatePasForm from '../createPasForm/CreatePasForm';
import styles from './styles.module.css';
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <CreatePasForm />
    </div>
  );
};

export default Sidebar;

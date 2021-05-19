import React from 'react';
import CreatePasForm from '../createPasForm/CreatePasForm';
import User from '../user/User';
import styles from './styles.module.css';
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <User />
      <CreatePasForm />
    </div>
  );
};

export default Sidebar;

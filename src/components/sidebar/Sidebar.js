import React from 'react';
import CreatePasForm from '../createPasForm/CreatePasForm';

import styles from './styles.module.css';
const Sidebar = ({ closeModal }) => {
  return (
    <div className={styles.sidebar}>
      <CreatePasForm closeModal={closeModal} />
    </div>
  );
};

export default Sidebar;

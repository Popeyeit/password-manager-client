import React from 'react';
import DashBoardHeader from '../../components/dashBoardHeader/DashBoardHeader';
import PasswordList from '../../components/passwordList/PasswordList';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './styles.module.css';
const DashBoard = () => {
  return (
    <>
      <section className={styles.page}>
        <div>
          <DashBoardHeader />
          <div className={styles.wrapper}>
            <Sidebar />
            <PasswordList />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoard;

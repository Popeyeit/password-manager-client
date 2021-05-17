import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../../img/security.svg';
import styles from './styles.module.css';

const Home = ({ type }) => {
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.sidebar}>
          <h1 className={styles.title}>
            Вы знаете, как придумать пароль, мы знаем, как сохранить.
          </h1>
          <img src={image} alt="security" title="" />
        </div>

        <div className={styles.wrapper}>
          <NavLink className={styles.auth_btn} to="sign-in">
            Вход
          </NavLink>
          <NavLink className={styles.auth_btn} to="sign-up">
            Регистрация
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Home;

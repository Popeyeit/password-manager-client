import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AuthForm from '../authForm/AuthForm';
import image from '../../img/auth.svg';
import forgotImage from '../../img/forgot_pas.svg';
import styles from './styles.module.css';
const Auth = ({ type, textBtn }) => {
  const location = useLocation();
  const authTitle = useMemo(() => {
    switch (location.pathname) {
      case '/sign-up':
        return 'Регистрация';
      case '/recover-password':
        return 'Восстановить пароль';

      default:
        return 'Войти в приложение';
    }
  }, [location.pathname]);

  return (
    <section className={styles.auth}>
      <div className={styles.auth_wrapper}>
        <div className={styles.form_wrapper}>
          <h2>{authTitle}</h2>
          <AuthForm type={type} textBtn={textBtn} />
          <div className={styles.auth_links}>
            {location.pathname !== '/sign-up' && (
              <NavLink className={styles.btn} to="/sign-up">
                Регистрация
              </NavLink>
            )}
            {location.pathname !== '/sign-in' && (
              <NavLink className={styles.btn} to="/sign-in">
                Войти в приложение
              </NavLink>
            )}

            {location.pathname !== '/recover-password' && (
              <NavLink className={styles.btn} to="/recover-password">
                Востановить пароль
              </NavLink>
            )}
          </div>
        </div>

        <img
          src={type === 'recoverPassword' ? forgotImage : image}
          alt="auth"
          title=""
          className={`${
            type === 'recoverPassword' ? styles.recover_img : null
          }`}
        />
      </div>
    </section>
  );
};

export default Auth;

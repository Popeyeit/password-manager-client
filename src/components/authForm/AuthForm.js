import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import validate from './validate';
import {
  registerOperation,
  loginOperation,
  recoverPasswordOperation,
} from '../../redux/user/operations';
import { unsetError } from '../../redux/error/slice';
import styles from './styles.module.css';

const AuthForm = ({ type = 'signUp', textBtn }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(state => state.error);
  const [verification, setVerification] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  useEffect(() => {
    dispatch(unsetError(''));
    return () => {
      dispatch(unsetError(''));
    };
  }, [dispatch, type]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      email: '',
    },

    validationSchema: type !== 'signIn' && validate(type),

    onSubmit: values => {
      const isConfirmedPassword = values.password === values.confirmPassword;
      if (!isConfirmedPassword && type !== 'signIn') {
        setConfirmedPassword(true);
        return false;
      }
      if (type === 'signUp') {
        dispatch(
          registerOperation(
            { email: values.email, password: values.password },
            history,
          ),
        );
      }
      if (type === 'signIn') {
        dispatch(
          loginOperation({ email: values.email, password: values.password }),
        );
      }
      if (type === 'recoverPassword') {
        dispatch(
          recoverPasswordOperation({
            email: values.email,
            password: values.password,
          }),
        );
        history.push('/verification');
      }

      formik.resetForm();
    },
  });

  useMemo(() => {
    if (formik.values.email.length > 0 || formik.values.password.length > 0) {
      setVerification('');
      dispatch(unsetError(''));
    }

    setConfirmedPassword(false);
  }, [formik.values.password, formik.values.email, dispatch]);

  useMemo(() => {
    formik.resetForm();
  }, [type]);
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      {!error && confirmedPassword && (
        <p className={styles.error_pas}>Пароли не совпадают</p>
      )}
      {!error && verification && (
        <p className={styles.verification}>
          Подтвердите Ваш адрес электронной почты.
        </p>
      )}
      {error && <p> {error}</p>}

      <label htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail *"
          required
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <span className={styles.error}>{formik.errors.email}</span>
        ) : null}
      </label>
      <label htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль *"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        {formik.errors.password ? (
          <span className={styles.error}>{formik.errors.password}</span>
        ) : null}
      </label>
      {type !== 'signIn' ? (
        <label htmlFor="confirmPassword">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль *"
            required
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? (
            <span className={styles.error}>
              {formik.errors.confirmPassword}
            </span>
          ) : null}
        </label>
      ) : null}

      <button type="submit" className={styles.auth_btn}>
        {textBtn}
      </button>
    </form>
  );
};

export default AuthForm;

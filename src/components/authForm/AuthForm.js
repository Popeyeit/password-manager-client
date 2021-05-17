import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, useFormik } from 'formik';
import validate from './validate';
import {
  registerOperation,
  loginOperation,
  recoverPasswordOperation,
} from '../../redux/user/operations';
import { unsetError } from '../../redux/error/slice';
import styles from './styles.module.css';
// import Indicate from '../indicate/Indicate';

const AuthForm = ({ type = 'signUp', textBtn }) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const [verification, setVerification] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState(false);

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
          registerOperation({ email: values.email, password: values.password }),
        );
        setVerification('Подтвердите Ваш адрес электронной почты.');
      }
      if (type === 'signIn') {
        dispatch(
          loginOperation({ email: values.email, password: values.password }),
        );
      }
      if (type === 'recoverPassword') {
        recoverPasswordOperation({
          email: values.email,
          password: values.password,
        });
        setVerification('Подтвердите Ваш адрес электронной почты.');
      }

      formik.resetForm();
    },
  });

  useMemo(() => {
    dispatch(unsetError(''));
    setConfirmedPassword(false);
    setVerification('');
  }, [formik.values.password, formik.values.email]);

  useMemo(() => {
    formik.resetForm();
  }, [type]);
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      {!error && confirmedPassword && (
        <p className={styles.error_pas}>Пароли не совпадают</p>
      )}
      {!error && verification && (
        <p className={styles.verification}>{verification}</p>
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
        {/*{type === 'signUp' && formik.values.password.length > 0 && (
          <Indicate safety={formik.values.password} />
        )}*/}
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
    // <Formik
    //   initialValues={{ password: '', confirmPassword: '', email: '' }}
    //   validationSchema={authSchema(type)}
    //   onSubmit={values => {
    //     setConfirmedPassword(false);
    //     console.log();

    //     // console.log(values);
    //     const isConfirmedPassword = values.password === values.confirmPassword;
    //     if (!isConfirmedPassword) {
    //       setConfirmedPassword(true);
    //       return false;
    //     }
    //     console.log(isConfirmedPassword);

    //     // type === 'signUp'
    //     //   ? dispatch(registerOperation(values, onCloseAuth))
    //     //   : dispatch(
    //     //       loginOperation(
    //     //         {
    //     //           email: values.email,
    //     //           password: values.password,
    //     //         },
    //     //         onCloseAuth,
    //     //       ),
    //     //     );
    //   }}
    // >
    //   {({ errors, touched }) => {
    //     return (
    //       <Form className={styles.form}>
    //         {confirmedPassword && <div>Пароли не совпадают</div>}
    //         <label>
    //           <Field
    //             name="email"
    //             type="email"
    //             placeholder="E-mail *"
    //             required
    //           />
    //           {errors.email && touched.email ? (
    //             <span className={styles.error}>{errors.email}</span>
    //           ) : null}
    //         </label>

    //         <label>
    //           <Field
    //             name="password"
    //             type="password"
    //             placeholder="Пароль *"
    //             required
    //           />
    //           {type === 'signUp' && <Indicate />}

    //           {errors.password && touched.password ? (
    //             <span className={styles.error}>{errors.password}</span>
    //           ) : null}
    //         </label>

    //         {type === 'signUp' ? (
    //           <label>
    //             <Field
    //               name="confirmPassword"
    //               type="password"
    //               placeholder="Подтвердите пароль *"
    //               required
    //             />
    //             {errors.confirmPassword && touched.confirmPassword ? (
    //               <span className={styles.error}>{errors.confirmPassword}</span>
    //             ) : null}
    //           </label>
    //         ) : null}
    //         <button type="submit" className={styles.auth_btn}>
    //           submit
    //         </button>
    //       </Form>
    //     );
    //   }}
    // </Formik>
  );
};

export default AuthForm;

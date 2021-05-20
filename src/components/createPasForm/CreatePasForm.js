import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createPasswordOperation,
  deletePasswordOperation,
  changePasswordOperation,
} from '../../redux/password/operations';
import styles from './styles.module.css';
const initState = {
  name: '',
  password: '',
  login: '',
};
const CreatePasForm = ({
  contentModal,
  type = 'create',
  currentOpenedItem,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const [formValues, SetFormValues] = useState(initState);
  const [showPas, setShowPas] = useState(false);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    SetFormValues(prev => ({ ...prev, [name]: value }));
  };
  const showPasFn = () => {
    setShowPas(prev => !prev);
  };
  const deleteItem = () => {
    dispatch(deletePasswordOperation(currentOpenedItem));
    SetFormValues(initState);
    closeModal();
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (type === 'create') {
      dispatch(createPasswordOperation({ ...formValues }));
    }
    if (type === 'change') {
      dispatch(
        changePasswordOperation(currentOpenedItem, {
          name: formValues.name,
          login: formValues.login,
          password: formValues.password,
        }),
      );
    }
    SetFormValues(initState);
    closeModal();
  };
  useEffect(() => {
    if (!contentModal) {
      return;
    }
    SetFormValues(contentModal);
  }, [contentModal]);
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        <input
          required
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Название *"
          minLength="1"
          maxLength="20"
        />
      </label>
      <label>
        <input
          required
          type="text"
          name="login"
          value={formValues.login}
          onChange={handleChange}
          placeholder="Логин *"
          minLength="1"
          maxLength="20"
        />
      </label>
      <label className={styles.show_wrapper}>
        <input
          required
          type={showPas ? 'text' : 'password'}
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Пароль *"
        />
        {showPas ? (
          <span onClick={showPasFn} className={styles.show}></span>
        ) : (
          <span onClick={showPasFn} className={styles.show_active}></span>
        )}
      </label>
      {type === 'change' ? (
        <div className={styles.btn_wrapper}>
          <button className={styles.change_btn}>Изменить</button>
          <button
            className={styles.delete_btn}
            type="button"
            onClick={deleteItem}
          >
            Удалить
          </button>
        </div>
      ) : (
        <button className={styles.add_btn}>Добавить</button>
      )}
    </form>
  );
};

export default CreatePasForm;

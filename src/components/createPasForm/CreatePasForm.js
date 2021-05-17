import React, { useState } from 'react';
import styles from './styles.module.css';
const initState = {
  name: '',
  password: '',
};
const CreatePasForm = () => {
  const [formValues, SetFormValues] = useState(initState);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    SetFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    SetFormValues(initState);
  };
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
        />
      </label>
      <label>
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Пароль *"
        />
      </label>
      <button>Добавить</button>
    </form>
  );
};

export default CreatePasForm;

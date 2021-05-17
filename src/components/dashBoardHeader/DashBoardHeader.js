import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter/slice';
import { logoutOperation } from '../../redux/user/operations';
import styles from './styles.module.css';

const DashBoardHeader = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const handleChange = ({ target }) => {
    dispatch(setFilter(target.value));
  };
  const handleLogout = () => {
    dispatch(logoutOperation());
  };
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.search_wrapper}>
            <label>
              <input
                type="text"
                value={filter}
                name="filter"
                onChange={handleChange}
                placeholder="Поиск"
              />
            </label>
          </div>
          <div className={styles.user}>
            <p className={styles.email}>popeyeIT@gmail.com</p>

            <button
              type="button"
              className={styles.logout}
              onClick={handleLogout}
            >
              Выход
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;

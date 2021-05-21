import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter/slice';
import { logoutOperation } from '../../redux/user/operations';
import styles from './styles.module.css';

const DashBoardHeader = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const loader = useSelector(state => state.loader);
  const error = useSelector(state => state.error);
  const email = useSelector(state => state.auth.user);
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
            {!loader && !error && email && (
              <>
                <p className={styles.email}>{email}</p>
                <button
                  type="button"
                  className={styles.logout}
                  onClick={handleLogout}
                >
                  Выход
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;

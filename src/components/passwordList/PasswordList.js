import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Item from '../passwordItem/PasswordItem';
import styles from './styles.module.css';

const PasswordList = ({ data, handleModal }) => {
  const filter = useSelector(state => state.filter);
  const filteredData = useMemo(() => {
    return filter.length > 0
      ? data.filter(pasItem =>
          pasItem.name.toLowerCase().includes(filter.toLowerCase()),
        )
      : data;
  }, [filter, data]);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {filteredData.map(password => (
          <Item key={password.id} {...password} handleModal={handleModal} />
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;

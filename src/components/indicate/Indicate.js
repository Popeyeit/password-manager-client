import React, { useRef } from 'react';
import styles from './styles.module.css';
const Indicate = ({ safety }) => {
  const ref = useRef(null);
  const isSafety = () => {
    if (safety.length > 8) {
      ref.current.classList.add('indicate_yellow');
    }
    if (safety.length > 15) {
      ref.current.classList.add('indicate_green');
    }
  };
  return <div ref={ref} className={styles.indicate}></div>;
};

export default Indicate;

import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPasswordsOperation } from '../../redux/password/operations';
import DashBoardHeader from '../../components/dashBoardHeader/DashBoardHeader';
import PasswordList from '../../components/passwordList/PasswordList';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './styles.module.css';
import Spinner from '../../components/spinner/Spinner';
import Modal from '../../components/modal/Modal';
import CreatePasForm from '../../components/createPasForm/CreatePasForm';
const DashBoard = () => {
  const dispatch = useDispatch();
  const { error, passwords, loader } = useSelector(state => state);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [currentOpenedItem, setCurrentOpenedItem] = useState(null);
  const [createModalForm, setCreateModalForm] = useState(false);
  const openModalCreateItem = () => {
    setCreateModalForm(true);
  };
  const openModal = id => {
    setIsOpenedModal(true);
    setCurrentOpenedItem(id);
  };
  const closeModalByKey = e => {
    if (e.code === 'Escape') {
      setCurrentOpenedItem(null);
      setIsOpenedModal(false);
      setCreateModalForm(false);
      return;
    }
  };
  const closeModal = e => {
    if (!e) {
      setCurrentOpenedItem(null);
      setIsOpenedModal(false);
      setCreateModalForm(false);
      return;
    }
    if (!e.target) {
      setIsOpenedModal(false);
      return;
    }
    if (e.target === e.currentTarget) {
      setCurrentOpenedItem(null);
      setIsOpenedModal(false);
      setCreateModalForm(false);
    }
    if (e.target.dataset.close === 'close') {
      setCurrentOpenedItem(null);
      setIsOpenedModal(false);
      setCreateModalForm(false);
    }
  };
  const contentModal = useMemo(() => {
    return passwords.find(pas => pas.id === currentOpenedItem);
  }, [currentOpenedItem]);
  useEffect(() => {
    (async () => {
      await dispatch(getPasswordsOperation());
    })();
  }, []);

  return (
    <>
      <section className={styles.page}>
        <div>
          <DashBoardHeader />
          <div className={styles.wrapper}>
            <Sidebar />
            {isOpenedModal && (
              <Modal closeModal={closeModal} closeModalByKey={closeModalByKey}>
                <CreatePasForm
                  closeModal={closeModal}
                  contentModal={contentModal}
                  type="change"
                  currentOpenedItem={currentOpenedItem}
                />
              </Modal>
            )}
            {createModalForm && (
              <Modal closeModal={closeModal} closeModalByKey={closeModalByKey}>
                <CreatePasForm
                  contentModal={contentModal}
                  type="create"
                  closeModal={closeModal}
                />
              </Modal>
            )}
            {loader && !error && (
              <div className={styles.spinner}>
                <Spinner type="spin" color="#4c4cff" />
              </div>
            )}
            {passwords.length > 0 && !error && !loader && (
              <PasswordList data={passwords} handleModal={openModal} />
            )}
          </div>
        </div>
        <button
          className={styles.open_create_btn}
          onClick={openModalCreateItem}
        >
          +
        </button>
      </section>
    </>
  );
};

export default DashBoard;

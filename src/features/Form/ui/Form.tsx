import type React from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { type IUserFormData } from '../model/types/FormData';
import { postForm } from '../../../shared/api/formApi';
import chatNameSlice from '../../../entity/chatName/chatNameSlice';
import styles from './Form.module.scss';

interface FormProps {
  onSubmit: (userData: IUserFormData) => void; // Изменение типа для пропа onSubmit
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {

  const dispatch = useAppDispatch();


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const phone_number = formData.get('phone') as string;

    const userData = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      consent: formData.get('dataProcessingConsent') === 'on',
    };

    try {
      dispatch(postForm({ name, phone_number }))
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }

    onSubmit(userData);

  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
          Имя:
        </label>
        <input type="text" id="name" name="name" required placeholder="Введите ваше имя" />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
          Название компании:
        </label>
        <input type="text" id="company" name="company" required placeholder="Введите название Вашей компании" />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="phone">
          Телефон:
        </label>
        <input type="tel" id="phone" name="phone" required placeholder="Введите ваш номер телефона" />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="dataProcessingConsent">
          Согласен на обработку персональных данных
        </label>
        <input type="checkbox" id="dataProcessingConsent" name="dataProcessingConsent" required />
      </div>
      <div className={styles.formGroup}>
        <button type="submit" className={styles.submitButton}>
          Начать чат
        </button>
      </div>
    </form>
  );
};

export default Form;

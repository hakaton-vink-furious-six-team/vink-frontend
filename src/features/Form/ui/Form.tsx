import type React from 'react';
import { type IUserFormData } from '../model/types/FormData';
import styles from './Form.module.scss';

interface FormProps {
  onSubmit: (userData: IUserFormData) => void; // Изменение типа для пропа onSubmit
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      consent: formData.get('dataProcessingConsent') === 'on',
    };

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

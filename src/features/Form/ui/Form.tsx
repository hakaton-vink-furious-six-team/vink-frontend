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
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      consent: formData.get('dataProcessingConsent') === 'on',
    };

    onSubmit(userData);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Имя:</label>
        <input type="text" id="name" name="name" required placeholder="Введите ваше имя" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="Введите ваш email" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Телефон:</label>
        <input type="tel" id="phone" name="phone" required placeholder="Введите ваш номер телефона" />
      </div>
      <div className={styles.formGroup}>
        <input type="checkbox" id="dataProcessingConsent" name="dataProcessingConsent" required />
        <label htmlFor="dataProcessingConsent">Согласен на обработку персональных данных</label>
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

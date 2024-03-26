import { useState } from 'react';
import styles from './ChatWidget.module.scss';
import Form from '../Form/Form';
import Chat from '../Chat/Chat';
import type { IUserFormData } from '../../types/types';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleSubmit = (data: IUserFormData) => {
    setIsFormSubmitted(true);
  };

  return (
    <div className={styles.widget}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={styles.button}>
        Чат
      </button>
      {isOpen && <div className={styles.window}>{!isFormSubmitted ? <Form onSubmit={handleSubmit} /> : <Chat />}</div>}
    </div>
  );
}

export default ChatWidget;

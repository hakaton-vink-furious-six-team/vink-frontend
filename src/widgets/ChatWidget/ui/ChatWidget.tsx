import { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import styles from './ChatWidget.module.scss';
import { Form } from '../../../features/Form';
import Chat from '../../../features/Chat';
import { Assessment } from '../../../features/Assessment';
import { OpenChatButton } from '../../../features/OpenChatButton';
import { selectIsOpen, closeChat } from '../../../features/OpenChatButton/model/ButtonStateSlice';
import { selectIsSubmitted, setSubmitted } from '../../../features/Form/model/FormStateSlice';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { type IUserFormData } from '../../../features/Form';
import { ReactComponent as CloseChat } from '../../../features/OpenChatButton/assets/closeChat.svg';

function ChatWidget() {
  const dispatch = useAppDispatch();

  const [isRatingRequested, setIsRatingRequested] = useState(false);

  const handleCloseChat = () => {
    dispatch(closeChat());
    setIsRatingRequested(true);
  };

  const handleRatingSubmit = (rating: number) => {
    console.log(`Пользователь поставил оценку: ${rating}`);
    setIsRatingRequested(false);
  };

  const isOpen = useAppSelector(selectIsOpen);
  const isFormSubmitted = useAppSelector(selectIsSubmitted);

  return (
    <div className={styles.widget}>
      <OpenChatButton />
      {isOpen && (
        <ResizableBox
          className={styles.window}
          width={330}
          height={400}
          resizeHandles={['nw']}
          handle={<span className={`${styles.custom_handle} ${styles.custom_handle_nw}`} />}
          handleSize={[8, 8]}
          minConstraints={[330, 400]}
          maxConstraints={[800, 550]}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>Чат с vink.ru</h2>
            <button className={styles.closeChat} type="button" onClick={handleCloseChat} aria-label="закрыть чат">
              <CloseChat />
            </button>
          </div>
          {!isFormSubmitted ? <Form onSubmit={(data: IUserFormData) => dispatch(setSubmitted())} /> : <Chat />}
        </ResizableBox>
      )}
      {!isOpen && isRatingRequested && <Assessment onSubmit={handleRatingSubmit} />}
    </div>
  );
}

export default ChatWidget;

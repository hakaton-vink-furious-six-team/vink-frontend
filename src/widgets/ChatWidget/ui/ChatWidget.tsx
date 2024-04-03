import { ResizableBox } from 'react-resizable';
import styles from './ChatWidget.module.scss';
import { Form } from '../../../features/Form';
import Chat from '../../../features/Chat';
import { OpenChatButton } from '../../../features/OpenChatButton';
import { selectIsOpen, closeChat } from '../../../features/OpenChatButton/model/ButtonStateSlice';
import { selectIsSubmitted, setSubmitted } from '../../../features/Form/model/FormStateSlice';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { type IUserFormData } from '../../../features/Form';
import { ReactComponent as CloseChat } from '../../../image/closeChat.svg';

function ChatWidget() {
  const dispatch = useAppDispatch();

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
            <button
              className={styles.closeChat}
              type="button"
              onClick={() => dispatch(closeChat())}
              aria-label="закрыть чат"
            >
              <CloseChat />
            </button>
          </div>
          {!isFormSubmitted ? <Form onSubmit={(data: IUserFormData) => dispatch(setSubmitted())} /> : <Chat />}
        </ResizableBox>
      )}
    </div>
  );
}

export default ChatWidget;

import styles from './ChatWidget.module.scss';
import { Form } from '../../../features/Form';
import Chat from '../../../features/Chat';
import { OpenChatButton } from '../../../features/OpenChatButton';
import { selectIsOpen } from '../../../features/OpenChatButton/model/ButtonStateSlice';
import { selectIsSubmitted, setSubmitted } from '../../../features/Form/model/FormStateSlice';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { type IUserFormData } from '../../../features/Form';

function ChatWidget() {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsOpen);
  const isFormSubmitted = useAppSelector(selectIsSubmitted);

  return (
    <div className={styles.widget}>
      <OpenChatButton />
      {isOpen && (
        <div className={styles.window}>
          {!isFormSubmitted ? <Form onSubmit={(data: IUserFormData) => dispatch(setSubmitted())} /> : <Chat />}
        </div>
      )}
    </div>
  );
}

export default ChatWidget;

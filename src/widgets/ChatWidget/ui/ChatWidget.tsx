import { useEffect, useState } from 'react';
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

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [minConstraints, setMinConstraints] = useState<[number, number]>([330, 400]);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (window.innerWidth < 890) {
        setMinConstraints([200, 300]);
      } else {
        setMinConstraints([330, 400]);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [windowWidth, setWindowWidth] = useState({
    width: window.innerWidth,
  });

  const [width, setWidth] = useState<number>(330);

  useEffect(() => {
    function handleWidth() {
      setWindowWidth({
        width: window.innerWidth,
      });

      if (window.innerWidth < 890) {
        setWidth(230);
      } else {
        setWidth(330);
      }
    }
    window.addEventListener('resize', handleWidth);

    handleWidth();

    return () => window.removeEventListener('resize', handleWidth);
  }, []);

  const [windowHeight, setWindowHeight] = useState({
    width: window.innerWidth,
  });

  const [height, setHeight] = useState<number>(400);

  useEffect(() => {
    function handleHeight() {
      setWindowHeight({
        width: window.innerWidth,
      });

      if (window.innerWidth < 890) {
        setHeight(300);
      } else {
        setHeight(400);
      }
    }
    window.addEventListener('resize', handleHeight);

    handleHeight();

    return () => window.removeEventListener('resize', handleHeight);
  }, []);

  return (
    <div className={styles.widget}>
      <OpenChatButton />
      {isOpen && (
        <ResizableBox
          className={styles.window}
          width={width}
          height={height}
          resizeHandles={['nw']}
          handle={<span className={`${styles.custom_handle} ${styles.custom_handle_nw}`} />}
          handleSize={[8, 8]}
          minConstraints={minConstraints}
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

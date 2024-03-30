import { useState } from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { clickButton } from '../model/ButtonStateSlice';
import styles from './OpenChatButton.module.scss';
import { ReactComponent as ChatIcon } from '../../../image/chat.svg';
import { ReactComponent as TgIcon } from '../../../image/tg.svg';
import { ReactComponent as CloseIcon } from '../../../image/close.svg';

function OpenChatButton() {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const ButtonIcon = isExpanded ? CloseIcon : ChatIcon;

  return (
    <div className={styles.container}>
      <div className={`${styles.additionalButtonContainer} ${isExpanded ? styles.expanded : ''}`}>
        {isExpanded && (
          <>
            <button type="button" className={styles.tgIcon} aria-label="перейти в телеграмм">
              <TgIcon />
            </button>
            <button
              type="button"
              onClick={() => dispatch(clickButton())}
              className={styles.chatIcon}
              aria-label="Открыть чат"
            >
              <ChatIcon />
            </button>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={handleButtonClick}
        className={`${styles.button} ${isExpanded ? styles.expanded : ''}`}
        aria-label="Открыть чат"
      >
        <ButtonIcon />
      </button>
    </div>
  );
}

export default OpenChatButton;

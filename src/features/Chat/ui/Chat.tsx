import type React from 'react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { type IMessage } from '../model/types/Message';
import { emojiList } from '../utils/utils';
import { ReactComponent as EmojiListIcon } from '../assets/emoji.svg'
import styles from './Chat.module.scss';

function Chat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  const handleMessageSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (!message.trim()) return; // Предотвращаем отправку пустых сообщений

    const newMessage: IMessage = {
      text: message,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages([newMessage, ...messages]); // Добавляем сообщение пользователя в список
    // Здесь можно отправить сообщение на сервер и получить ответ от чат-бота
    setMessage('');
  };

  const getDate = (timestamp: number) => { // преобразовываю дату в читаемый формат
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return (`${hours}:${minutes}`);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => { // Отслеживаем нажатые кнопки в textarea, чтобы прожать сабмит на Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleMessageSubmit(e);
    }
  }

  const addEmoji = (emoji: string) => {
    setMessage(message + emoji);
    setShowEmojis(false);
  };

  return (
    <div className={styles.chat}>

      <div className={styles.messages}>
        {messages.map((msg) => (

          msg.sender === 'user' ?
            <div
              key={`${msg.sender}-${msg.timestamp}`}
              className={styles.botMessage}>

              <div className={styles.titleWrapper}>
                <p className={styles.timestamp}>
                  {getDate(msg.timestamp)}
                </p>
              </div>

              {msg.text}

            </div>
            :
            <div
              key={`${msg.sender}-${msg.timestamp}`}
              className={styles.botMessage}>

              <div className={styles.titleWrapper}>
                <p className={styles.sender}>Аркадий Иванов</p>
                <p className={styles.timestamp}>
                  {getDate(msg.timestamp)}
                </p>
              </div>

            </div>
        ))}
      </div>

      {showEmojis && (
        <div className={styles.emojiPanel}>
          {emojiList.map((emoji) => (
            <button type="button" key={emoji} onClick={() => addEmoji(emoji)} className={styles.emoji}>
              {emoji}
            </button>
          ))}
        </div>
      )}

      <form className={styles.messageForm}>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишите сообщение..."
          className={styles.messageInput}
          onKeyDown={handleKeyDown}
        />

        <div>
          <button
            aria-label="Открыть список эмодзи"
            type="button" onClick={() => setShowEmojis(!showEmojis)} className={styles.button} >
            <EmojiListIcon />
          </button>
        </div>

      </form>

    </div>
  );
}

export default Chat;

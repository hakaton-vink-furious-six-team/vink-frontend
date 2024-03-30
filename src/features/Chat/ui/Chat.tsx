import type React from 'react';
import { useState } from 'react';
import { type IMessage } from '../model/types/Message';
import styles from './Chat.module.scss';
import { emojiList } from '../utils/utils';

function Chat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return; // Предотвращаем отправку пустых сообщений

    const newMessage: IMessage = {
      text: message,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]); // Добавляем сообщение пользователя в список
    // Здесь можно отправить сообщение на сервер и получить ответ от чат-бота
    setMessage('');
  };

  const addEmoji = (emoji: string) => {
    setMessage(message + emoji);
    setShowEmojis(false);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={`${msg.sender}-${msg.timestamp}`}
            className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
            {msg.text}
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
      <form onSubmit={handleMessageSubmit} className={styles.messageForm}>
        <button type="button" onClick={() => setShowEmojis(!showEmojis)} className={styles.emojiToggle}>
          😊
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишите сообщение..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendMessageButton}>
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Chat;

import type React from 'react';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { type IMessage } from '../model/types/Message';
import { emojiList } from '../utils/utils';
import { ReactComponent as EmojiListIcon } from '../assets/emoji.svg';
import { chatNameValue } from '../../../entity/chatName/chatNameSlice';
import { useAppSelector } from '../../../app/store/hooks';
import styles from './Chat.module.scss';

function Chat() {
  const [messageText, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const chatRoom = useAppSelector(chatNameValue);
  const socket = useRef<WebSocket | null>(null);

  interface socketMessage {
    message: string;
  }

  useEffect(() => {
    // Инициализация WebSocket соединения
    socket.current = new WebSocket('ws://127.0.0.1:8000/ws/chat/5/');
    socket.current.onopen = () => console.log('Соединение установлено');
    socket.current.onmessage = (event) => {
      const receivedMessage: IMessage = JSON.parse(event.data);
      console.log(receivedMessage)
      setMessages((prevMessages) => [receivedMessage, ...prevMessages]);
      console.log(messages)
    };
    socket.current.onclose = () => console.log('Соединение закрыто');
    socket.current.onerror = (error) => console.error('Ошибка соединения', error);

    return () => {
      socket.current?.close();
    };
  }, []);

  const handleMessageSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (!messageText.trim() || !socket.current) return;

    const socketMessage: socketMessage = {
      message: messageText
    }

    const newMessage: IMessage = {
      message: messageText,
      sender: 'user',
      timestamp: Date.now(),
    };

    socket.current.send(JSON.stringify(socketMessage));
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setMessage('');
  };

  const getDate = (timestamp: number) => {
    // преобразовываю дату в читаемый формат
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Отслеживаем нажатые кнопки в textarea, чтобы прожать сабмит на Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessageSubmit(e);
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(messageText + emoji);
    setShowEmojis(false);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((msg) =>
          msg.sender === 'user' ? (
            <div key={`${msg.sender}-${msg.timestamp}`} className={styles.userMessage}>
              <div className={styles.titleWrapper}>
                <p className={styles.timestamp}>{getDate(msg.timestamp)}</p>
              </div>
              {msg.message}
            </div>
          ) : (
            <div key={`${msg.sender}-${msg.timestamp}`} className={styles.botMessage}>
              <div className={styles.titleWrapper}>
                <p className={styles.sender}>Аркадий Иванов</p>
                <p className={styles.timestamp}>{getDate(msg.timestamp)}</p>
              </div>
              {msg.message}
            </div>
          )
        )}
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
          value={messageText}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишите сообщение..."
          className={styles.messageInput}
          onKeyDown={handleKeyDown}
        />

        <div>
          <button
            aria-label="Открыть список эмодзи"
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className={styles.button}
          >
            <EmojiListIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;

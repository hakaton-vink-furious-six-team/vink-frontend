export interface IMessage {
  key: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

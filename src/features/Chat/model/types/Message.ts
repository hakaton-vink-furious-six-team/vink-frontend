export interface IMessage {
  message: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

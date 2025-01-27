import { io } from 'socket.io-client';

// Connect to WebSocket server
const socket = io('wss://train-tune.gpteng.co');

export const emitWhistle = () => {
  socket.emit('train-whistle');
};

export const onWhistle = (callback: () => void) => {
  socket.on('train-whistle', callback);
};

export const cleanup = () => {
  socket.off('train-whistle');
};
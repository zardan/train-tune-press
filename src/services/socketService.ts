import { io } from 'socket.io-client';

// Connect to WebSocket server
const socket = io('wss://train-tune-press.lovable.app');

// Add connection event listeners
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from WebSocket server:', reason);
});

export const emitWhistle = () => {
  console.log('Emitting train whistle event');
  socket.emit('train-whistle');
};

export const onWhistle = (callback: () => void) => {
  console.log('Setting up train whistle listener');
  socket.on('train-whistle', () => {
    console.log('Received train whistle event');
    callback();
  });
};

export const cleanup = () => {
  console.log('Cleaning up WebSocket listeners');
  socket.off('train-whistle');
};
import { io } from 'socket.io-client';

// Connect to WebSocket server with explicit configuration
const socket = io('https://train-tune-press.lovable.app', {
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
});

// Add detailed connection event listeners
socket.on('connect', () => {
  console.log('Connected to WebSocket server', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('WebSocket connection error details:', {
    message: error.message,
    name: error.name,
    stack: error.stack
  });
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from WebSocket server:', reason);
  if (reason === 'io server disconnect') {
    // Server initiated disconnect, try reconnecting
    socket.connect();
  }
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});

export const emitWhistle = () => {
  if (!socket.connected) {
    console.warn('Socket not connected, attempting to reconnect...');
    socket.connect();
  }
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
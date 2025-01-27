// Import required modules
const fs = require('fs');
const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require('socket.io');

// Create an Express app
const app = express();

// Serve static files from the "dist" directory
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO server
const io = new Server(server, {
    path: '/socket.io/'
});

// Path to the log file
const logFilePath = './events.log';

// Function to log events to a JSON file
function logEvent(event) {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        let events = [];
        if (!err && data) {
            try {
                events = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing log file:', parseErr);
            }
        }
        events.push(event);
        fs.writeFile(logFilePath, JSON.stringify(events, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to log file:', writeErr);
            }
        });
    });
}

// Handle new Socket.IO connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle button press events from a client
    socket.on('train-whistle', (data) => {
        console.log("Got event", data);
        const event = {
            ...data,
            timestamp: new Date().toISOString(),
        };

        // Log the event
        logEvent(event);

        // Broadcast the event to all connected clients except the sender
        socket.broadcast.emit('train-whistle', event);
    });

    // Handle client disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Serving static files from ${distPath}`);
});
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const { spawn } = require("child_process");
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 29876;

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Servidor a ${port}`);
  });


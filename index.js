const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 29876;

function obtenirCarpetes(directori) {
    try {
        const contingut = fs.readdirSync(directori);
        const carpetes = contingut.filter(item => {
            return fs.statSync(path.join(directori, item)).isDirectory();
        });

        return carpetes;
    } catch (error) {
        console.error('Error llegint el directori:', error);
        return [];
    }
}

const directori = './Processos/';
const carpetes = obtenirCarpetes(directori);
console.log('Carpetes:', carpetes);

io.on('connection', (socket) => {
    console.log('Client connectat:', socket.id);

    socket.emit('processosData', JSON.stringify(carpetes));

    socket.on('message', (msg) => {
        console.log('Missatge rebut:', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client desconnectat:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});

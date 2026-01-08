const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} entrou na sala ${roomId}`);
        socket.to(roomId).emit('user-joined', socket.id);
    });

    socket.on('offer', (data) => {
        console.log('Offer recebida de', socket.id);
        socket.to(data.roomId).emit('offer', data);
    });

    socket.on('answer', (data) => {
        console.log('Answer recebida de', socket.id);
        socket.to(data.roomId).emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
        socket.to(data.roomId).emit('ice-candidate', data);
    });

    socket.on('camera-control', (data) => {
        socket.to(data.roomId).emit('camera-control', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
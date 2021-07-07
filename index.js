const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

io.on('connection', socket => {
  console.log('Someone connected oO');

  socket.on('chat message', message => {
    console.log(`Someone sent the following message: ${message}`);

    io.emit('chat message', message);
  })

  socket.on('disconnect', () => {
    console.log('Someone disconnected Oo');
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
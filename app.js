const app = require('express')();
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 8000;
// our server instance
const server = http.createServer(app);
const io = socketIO(server);

var notifications = []

app.get('/', (req, res) => {
  res.send('hello')
});

io.on('connect', socket => {
  console.log('User connected');

  socket.on("createNotifications", () => {
      notifications = [
        ...notifications,
        {
          'id': Date.now(),
          'name': `You just created a notification at ${new Date()}`
        }
      ];
      io.sockets.emit("notificationCreated", {
          'id': Date.now(),
          'name': `You just created a notification at ${new Date()}`
        }
      );

  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

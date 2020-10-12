class SimpleChat {
  constructor(server) {
    this.server = server;
    this.clients = []
    this.io = require('socket.io')(server, { origins: '*:*' });
    this.ioSimpleChat = this.io.of('/study/simple-chat');
  }

  registerOn() {

    this.ioSimpleChat.on('connection', socket => {

      socket.on('reqStoreClient', data => {
        const clientInfo = new Object();
        clientInfo.name = data.name;
        clientInfo.login = Date.now();
        clientInfo.avatar = data.avatar
        clientInfo.clientId = socket.id;
        this.clients.push(clientInfo);
        this.ioSimpleChat.emit('resNewUser', this.clients);
      });

      socket.on('disconnect', () => {
        for (let i = 0, len = this.clients.length; i < len; ++i) {
          const c = this.clients[i];
          if (c.clientId == socket.id) {
            this.clients.splice(i, 1);
            break;
          }
        }
        this.ioSimpleChat.emit('resOutUser', this.clients);
      });

      socket.on('reqServerChat', (data) => {
        console.log('reqServerChat data : ', data)
        this.ioSimpleChat.emit('resServerChat', data);
      });
    });
  }
}

module.exports = SimpleChat;

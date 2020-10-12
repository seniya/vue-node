const express = require('express');
const createError = require('http-errors');
const router = express.Router();

class NormalChat {

  constructor(app, server) {
    this.app = app
    this.server = server;
    this.clients = []
    this.contents = []
    this.io = require('socket.io')(server, { origins: '*:*' });
    this.ioNormalChat = this.io.of('/study/normal-chat');
    console.log('constructor clients : ', this.clients);
  }

  registerOn() {

    this.app.use('/api/study/simple-chat', router.post('/checkName', (req, res, next) => {
      const { user } = req.body
      console.log('/api/study/simple-chat/checkName user : ', user)

      let check = this.clients.find(c => c.user === user);
      console.log('check : ', check)

      if (check === undefined) {
        res.send({ success: true, body: user })
      } else {
        res.send({ success: false, msg: '잘못된 이름입니다' })
      }

    }));

    this.ioNormalChat.on('connection', socket => {

      socket.on('reqStoreClient', data => {
        const clientInfo = new Object();
        clientInfo.name = data.name;
        clientInfo.login = Date.now();
        clientInfo.avatar = data.avatar
        clientInfo.clientId = socket.id;
        this.clients.push(clientInfo);
        console.log('reqStoreClient clients : ', this.clients);
        this.ioNormalChat.emit('resNewUser', this.clients);
      });

      socket.on('disconnect', () => {
        for (let i = 0, len = this.clients.length; i < len; ++i) {
          const c = this.clients[i];
          if (c.clientId == socket.id) {
            this.clients.splice(i, 1);
            break;
          }
        }
        console.log('disconnect clients : ', this.clients);
        this.ioNormalChat.emit('resOutUser', this.clients);
      });

      socket.on('reqServerChat', (data) => {
        this.contents.push(data)
        console.log('reqServerChat this.contents length : ', this.contents.length)
        this.ioNormalChat.emit('resServerChat', data);
      });

      socket.on('reqAllContents', (data) => {
        // console.log('this.contents length : ', this.contents.length)
        this.ioNormalChat.emit('resAllContents', this.contents);
      });


    });
  }
}

module.exports = NormalChat;
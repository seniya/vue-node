const express = require('express');
const createError = require('http-errors');
const PaintGame = require('../../../models/paintGame')
const router = express.Router();

class PaintChatGame {

  constructor(app, server) {
    this.app = app
    this.server = server;
    this.clients = []
    this.contents = []
    this.io = require('socket.io')(server, { origins: '*:*' });
    this.ioPaintChatGame = this.io.of('/study/paint-game');
    // console.log('constructor clients : ', this.clients);
  }

  registerOn() {

    this.app.use('/api/study/paint-game', router.get('/info', async (req, res, next) => {
      const defaultGame = {
        running: false,
        image: ''
      }
      try {
        const rs = await PaintGame.findOne()
        if (!rs) {
          const r = await PaintGame.create(defaultGame)
          res.send({ success: true, body: r })
        } else {
          res.send({ success: true, body: rs })
        }
      } catch (error) {
        res.send({ success: false, msg: error.message })
      }

    }));

    this.app.use('/api/study/paint-game', router.post('/update', (req, res, next) => {
      PaintGame.updateOne({ _id: req.body._id }, { $set: req.body })
        .then(rs => {
          return PaintGame.findOne({ _id: req.body._id })
        })
        .then(r => {
          res.send({ success: true, body: r, token: req.token })
        })
        .catch(e => {
          res.send({ success: false, msg: e.message })
        })
    }));

    this.ioPaintChatGame.on('connection', socket => {

      console.log('connection : ', socket.id)

      socket.on('reqStoreClient', data => {

        // console.log('reqStoreClient data : ', data)

        const clientInfo = new Object();
        clientInfo.name = data.name;
        clientInfo.login = Date.now();
        clientInfo.avatar = data.avatar
        clientInfo.clientId = socket.id;
        this.clients.push(clientInfo);
        // console.log('reqStoreClient clients : ', this.clients.length);
        this.ioPaintChatGame.emit('resNewUser', this.clients);
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
        this.ioPaintChatGame.emit('resOutUser', this.clients);
      });

      socket.on('reqServerChat', async (data) => {
        this.saveDataCash(data)
        // console.log('reqServerChat this.contents length : ', this.contents.length)

        await this.saveDataDb(data)

        this.ioPaintChatGame.emit('resServerChat', data);
      });

      socket.on('reqAllContents', async (data) => {
        // console.log('this.contents length : ', this.contents.length)
        const oldContents = await this.getContents()
        console.log('reqAllContents oldContents : ', oldContents);
        this.ioPaintChatGame.emit('resAllContents', oldContents);
      });

      socket.on('reqTimer', async (data) => {
        console.log('reqTimer : ', data)
        const maxTime = data
        let time_ = data
        let result = 1
        let interval = null
        interval = setInterval(() => {
          result = (time_ / maxTime) * 100
          if (time_ === 0) {
            clearInterval(interval)
          } else {
            time_ -= 1
            this.ioPaintChatGame.emit('resTimer', result);
          }
        }, 1000)
      });
    });
  }

  saveDataCash(data) {
    this.contents.push(data)
  }

  async saveDataDb(data) {
    await Chat.create(data)
      .then(r => {
        // console.log('chat save success r:', r)
        this.contents.push(data)
      })
      .catch(e => {
        console.log('saveDataDb e:', e.message)
      })
  }

  async getContents() {
    let oldContents = this.contents
    // return oldContents

    await Chat.find()
      .then(rs => {
        // console.log('getContents rs : ', rs)
        oldContents = rs
      })
      .catch(e => {
        console.log('getContents e:', e.message)
      })

    return oldContents
  }
}

module.exports = PaintChatGame;
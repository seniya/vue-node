<template>
  <div class="module-paint-game-in">
    <v-container fluid fill-height>
      <v-row v-if="gameInfo && socket">
        <v-col cols="3">
          <playerComponent v-if="player === 'player-1'"
            :player="player"
            :myView="true"
            :onExit="actionExitBefore"
            :onStartTimer="actionStartTimer"
            :onSendMessage="actionSendMessage"
            :running="gameInfo.running"
            :contents="contents"/>
          <playerComponent v-else
            player="player-1"
            :myView="false"
            :onExit="actionExitBefore"
            :onStartTimer="actionStartTimer"
            :onSendMessage="actionSendMessage"
            :contents="contents"/>
          <div class="mb-10"></div>
          <playerComponent v-if="player === 'player-2'"
            :player="player"
            :myView="true"
            :onExit="actionExitBefore"
            :onSendMessage="actionSendMessage"
            :contents="contents"/>
          <playerComponent v-else
            player="player-2"
            :myView="false"
            :onExit="actionExitBefore"
            :onSendMessage="actionSendMessage"
            :contents="contents"/>
        </v-col>
        <v-col cols="6">
          <div class="ml-15 mr-15 mb-5">
            <div>주제어 : {{keywordView}}</div>
          </div>
          <div class="ml-15 mr-15">
            <v-progress-linear
              v-model="timer"
              color="amber"
              height="25"
            ></v-progress-linear>
          </div>
          <paintComponent
            v-if="gameInfo && socket"
            :onSaveImgData="actionsSaveImgData"
            :player="player"
            :imgData="imgData"
            :running="gameInfo.running"
            />
        </v-col>
        <v-col  cols="3">
          <playerComponent v-if="player === 'player-3'"
            :player="player"
            :myView="true"
            :onExit="actionExitBefore"
            :onSendMessage="actionSendMessage"
            :contents="contents"/>
          <playerComponent v-else
            player="player-3"
            :myView="false"
            :onExit="actionExitBefore"
            :contents="contents"/>
          <div class="mb-10"></div>
          <playerComponent v-if="player === 'player-4'"
            :player="player"
            :myView="true"
            :onExit="actionExitBefore"
            :onSendMessage="actionSendMessage"
            :contents="contents"/>
          <playerComponent v-else
            player="player-4"
            :myView="false"
            :onExit="actionExitBefore"
            :onSendMessage="actionSendMessage"
            :contents="contents"/>
           <!-- -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import io from 'socket.io-client'
import paintComponent from './componentPaint'
import playerComponent from './componentPlayer'
import { instance } from '@/api/instance'
import EventBus from '@/util/EventBus'

function apiGameInfo () {
  return instance({
    method: 'GET',
    url: '/study/paint-game/info'
  })
}

function apiGameUpdate (fdata) {
  return instance({
    method: 'POST',
    url: '/study/paint-game/update',
    data: fdata
  })
}

export default {
  components: {
    paintComponent,
    playerComponent
  },
  data () {
    return {
      socket: null,
      loading: null,
      maxTime: 60 * 5,
      // maxTime: 50,
      timer: 100,
      interval: null,
      player: localStorage.getItem('PAINT-GAME-PLAYER'), //  player-1, player-2, player-3, player-4
      players: [],
      avatar: null,
      gameInfo: null,
      contents: [],
      imgData: [],
      keyword: null
    }
  },

  created () {
    this.initAvatar()
    this.initSocket()
  },

  beforeDestroy () {
    clearInterval(this.interval)
    if (this.socket) {
      this.socket.close()
    }
  },

  computed: {
    keywordView () {
      let returnVal = ''
      if (this.keyword === null || this.keyword === '') {
        returnVal = '준비중입니다. 진행자가 [START] 버튼을 누르면 나타납니다.'
      } else {
        if (this.player === 'player-1') {
          returnVal = `${this.keyword} - 진행자만 보입니다.`
        } else {
          returnVal = `${this.keyword.length} 글자, 한글, 띄어쓰기 없습니다.`
        }
      }
      return returnVal
    }
  },

  methods: {

    initAvatar () {
      if (this.player === 'player-1') {
        this.avatar = 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
      } else if (this.player === 'player-2') {
        this.avatar = 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
      } else if (this.player === 'player-3') {
        this.avatar = 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
      } else if (this.player === 'player-4') {
        this.avatar = 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
      }
    },

    async initSocket () {
      const ioUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/study/paint-game' : 'https://seniya2.iptime.org/study/paint-game'
      this.socket = io(ioUrl, { secure: true })
      this.socket = io(ioUrl, { secure: true, transports: ['websocket'] })
      this.socket.on('connect', () => {
        this.requestGameInfo()
        this.$toast.success('접속 되었습니다.')
      })
      this.socket.on('resNewUser', (data) => {
        console.log('resNewUser data :', data)
        this.players = data
      })
      this.socket.on('resOutUser', (data) => {
        console.log('resOutUser data :', data)
        if (data.player !== this.player) {
          this.$toast.success('다른 유저가 퇴장하였습니다.')
        }
        this.players = data
      })
      this.socket.on('resTimer', (data) => {
        this.actionsReceiveTimer(data)
      })
      this.socket.on('resKeyword', (data) => {
        this.actionsReceiveKeyword(data)
      })
      this.socket.on('resServerChat', (data) => {
        this.actionsReceiveText(data)
      })
      this.socket.on('resResetGame', (data) => {
        this.actionsReceiveResetGame()
      })
      this.socket.on('resImgData', (data) => {
        this.actionsReceiveImgData(data)
      })
      this.socket.on('resResetTimer', (data) => {
        this.actionsReceiveResetTimer(data)
      })
      this.socket.on('resGameWin', (data) => {
        this.actionsReceiveGameWin(data)
      })
      this.socket.on('disconnect', () => {
        this.$toast.success('연결이 종료 되었습니다.')
      })
    },

    async actionExitBefore (player) {
      this.loading = this.$loading.show()
      const { data } = await apiGameInfo()
      if (!data.success) {
        this.loading.hide()
        this.$toast.error(data.msg)
      } else {
        const { body } = data
        this.actionExit(player, body)
      }
    },

    async actionExit (player, gameInfo) {
      gameInfo.users.splice(player, 1)
      const { data } = await apiGameUpdate(gameInfo)
      if (this.player === 'player-1') {
        await this.actionsResetGame()
      }
      this.loading.hide()
      if (!data.success) {
        this.$toast.error(data.msg)
      } else {
        localStorage.setItem('PAINT-GAME-PLAYER', player)
        this.$router.push('/study/paint-game-ready')
      }
    },

    async actionStartTimer () {
      this.loading = this.$loading.show()
      try {
        this.actionSetKeyword()
        const { data } = await apiGameInfo()
        data.body.running = true
        await apiGameUpdate(data.body)
        this.socket.emit('reqTimer', this.maxTime)
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.loading.hide()
      }
    },

    actionsReceiveTimer (time) {
      this.gameInfo.running = true
      if (time === 0) {
        this.updateGameState()
        this.timer = 100
      } else {
        this.timer = time
      }
    },

    actionsReceiveResetTimer (time) {
      this.gameInfo.running = false
      if (time === 0) {
        this.updateGameState()
        this.timer = 100
      } else {
        this.timer = time
      }
    },

    actionSetKeyword (type) {
      console.log('actionSetKeyword type : ', type)
      if (type === 'reset') {
        this.socket.emit('reqKeyword', '')
      } else {
        const keywords = this.gameInfo.keywords
        const length = keywords.length
        const randVal = Math.floor(Math.random() * (length - 0 + 1)) + 0
        const keyword = keywords[randVal]
        console.log('actionSetKeyword keyword : ', keyword)
        this.socket.emit('reqKeyword', keyword)
      }
    },

    actionsReceiveKeyword (data) {
      this.keyword = data
    },

    async actionsResetGame () {
      try {
        const { data } = await apiGameInfo()
        data.body.running = false
        data.body.image = ''
        data.body.users = []
        this.socket.emit('reqResetGame', data.body)
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    actionsReceiveResetGame (data) {
      this.$toast.error('게임 폭파!! 진쟁자에게 문의하세요.')
      this.$router.push('/study/paint-game-ready')
    },

    actionsSaveImgData (data) {
      // data {type, line}
      this.socket.emit('reqImgData', data)
    },

    actionsReceiveImgData (data) {
      console.log('actionsReceiveImgData :', data)
      this.imgData = data
    },

    actionStoreClient () {
      this.socket.emit('reqStoreClient', {
        player: this.player,
        avatar: this.avatar
      })
    },

    actionSendMessage (message) {
      if (message === null || message === '') {
        this.$toast.warning('텍스트를 입력해 주세요')
        return
      }
      const content = {
        text: message,
        time: Date.now(),
        player: this.player
      }
      if (this.socket) {
        this.socket.emit('reqServerChat', content)
      }
    },

    async actionsReceiveText (data) {
      console.log('actionsReceiveText data', data)
      this.contents.push(data)
    },

    async updateGameState () {
      this.loading = this.$loading.show()
      try {
        const { data } = await apiGameInfo()
        data.body.running = false
        const { data: data2 } = await apiGameUpdate(data.body)
        console.log('updateGameState apiGameUpdate data2 :', data2)
        this.gameInfo = data2.body

        this.actionSetKeyword('reset')
        EventBus.$emit('start:alertDialog', {
          title: '',
          text: '종료 되었습니다.',
          type: 1
        })
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.loading.hide()
      }
    },

    async actionsReceiveGameWin (data_) {
      this.loading = this.$loading.show()
      try {
        this.gameInfo.running = false
        if (this.player === 'palyer-1') {
          const { data } = await apiGameInfo()
          data.body.running = false
          await apiGameUpdate(data.body)
        }
        this.actionSetKeyword('reset')
        this.socket.emit('reqResetTimer')

        EventBus.$emit('start:alertDialog', {
          title: '',
          text: `정답은 [${data_.text}] - [${data_.player}] 님이 맞추셨습니다.`,
          type: 1
        })
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.loading.hide()
      }
    },

    async requestGameInfo () {
      this.loading = this.$loading.show()
      const { data } = await apiGameInfo()
      if (!data.success) {
        this.$toast.error(data.msg)
      } else {
        this.gameInfo = data.body
        this.loading.hide()
      }
      this.actionStoreClient()
    }
  }

}
</script>

<style lang="scss" scoped>

  .module-paint-game-in {
    position: relative;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    width: 100%;
    padding: 12px;
    margin-right: auto;
    margin-left: auto;
    height: 100%;
  }

</style>

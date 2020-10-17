<template>
  <div class="module-paint-game-in">
    <v-container fluid fill-height>
      <v-row>
        <v-col cols="3">
          <playerComponent v-if="player === 'player-1'"
            :user="player"
            :myView="true"
            :onExit="actionExitBefore"
            :onStartTimer="actionStartTimer"
            :running="gameInfo.running"/>
          <playerComponent v-else
            user="player-1"
            :myView="false"
            :onExit="actionExitBefore"
            :onStartTimer="actionStartTimer"/>
          <div class="mb-5"></div>
          <playerComponent v-if="player === 'player-2'"
            :user="player"
            :myView="true"
            :onExit="actionExitBefore"/>
          <playerComponent v-else
            user="player-2"
            :myView="false"
            :onExit="actionExitBefore"/>
        </v-col>
        <v-col cols="6">
          <div class="ml-15 mr-15">
            <v-progress-linear
              v-model="timer"
              color="amber"
              height="25"
            ></v-progress-linear>
          </div>
          <paintComponent></paintComponent>
          <div>주제어</div>
        </v-col>
        <v-col  cols="3">
          <playerComponent v-if="player === 'player-3'"
            :user="player"
            :myView="true"
            :onExit="actionExitBefore"/>
          <playerComponent v-else
            user="player-3"
            :myView="false"
            :onExit="actionExitBefore"/>
          <div class="mb-5"></div>
          <playerComponent v-if="player === 'player-4'"
            :user="player"
            :myView="true"
            :onExit="actionExitBefore"/>
          <playerComponent v-else
            user="player-4"
            :myView="false"
            :onExit="actionExitBefore"/>
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
      // maxTime: 60 * 5,
      maxTime: 100,
      timer: 100,
      interval: null,
      player: null, //  Player-1, Player-2, Player-3, Player-4
      gameInfo: null
    }
  },

  created () {
    this.initSocket()
  },

  beforeDestroy () {
    console.log('beforeDestroy')
    clearInterval(this.interval)
  },

  methods: {

    async initSocket () {
      const ioUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/study/paint-game' : 'https://seniya2.iptime.org/study/paint-game'
      this.socket = io(ioUrl, { secure: true })
      this.socket.on('connect', () => {
        this.requestApi()
        this.$toast.success('접속 되었습니다.')
      })
      this.socket.on('resNewUser', (data) => {
        if (data.user !== this.player) {
          this.$toast.success('새로운 유저 등장!')
        }
        this.users = data
      })
      this.socket.on('resOutUser', (data) => {
        if (data.user !== this.player) {
          this.$toast.success('다른 유저가 퇴장하였습니다.')
        }
        this.users = data
      })
      this.socket.on('resTimer', (data) => {
        this.actionTimer(data)
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
        const { data } = await apiGameInfo()
        data.body.running = true
        const { data: data2 } = await apiGameUpdate(data.body)
        console.log('apiGameUpdate data2 :', data2)
        this.gameInfo = data2.body
        this.socket.emit('reqTimer', this.maxTime)
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.loading.hide()
      }
    },
    actionTimer (time) {
      // console.log('actionTimer time :', time)
      if (time === 0) {
        EventBus.$emit('start:alertDialog', {
          title: '',
          text: '종료 되었습니다.',
          type: 1,
          confirmEvent: this.updateGameState()
        })
        this.timer = 100
      } else {
        this.timer = time
      }
    },

    async updateGameState () {
      this.loading = this.$loading.show()
      try {
        const { data } = await apiGameInfo()
        data.body.running = false
        const { data: data2 } = await apiGameUpdate(data.body)
        console.log('apiGameUpdate data2 :', data2)
        this.gameInfo = data2.body
        this.socket.emit('reqTimer', this.maxTime)
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.loading.hide()
      }
    },

    async requestApi () {
      this.loading = this.$loading.show()
      const { data } = await apiGameInfo()
      if (!data.success) {
        this.$toast.error(data.msg)
      } else {
        console.log('requestApi : ', data)
        this.gameInfo = data.body
        this.player = localStorage.getItem('PAINT-GAME-PLAYER')
        console.log('this.player : ', this.player)
        this.loading.hide()
      }
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

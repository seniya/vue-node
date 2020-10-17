<template>
  <div class="module-paint-game-ready">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card>
            <v-card-title>
              진행자
            </v-card-title>
            <v-card-text>
              Player-1
            </v-card-text>
            <v-card-actions>
              <v-btn text v-if="enableCheckIn('player-1')" @click="actionCheck('player-1')">
                <v-icon left>mdi-location-enter</v-icon>
                입장
              </v-btn>
              <v-btn text v-else disabled>
                <v-icon left>mdi-location-enter</v-icon>
                참가중
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card>
            <v-card-title>
              참가자
            </v-card-title>
            <v-card-text>
              Player-2
            </v-card-text>
            <v-card-actions>
              <v-btn text v-if="enableCheckIn('player-2')" @click="actionCheck('player-2')">
                <v-icon left>mdi-location-enter</v-icon>
                입장
              </v-btn>
              <v-btn text v-else disabled>
                <v-icon left>mdi-location-enter</v-icon>
                참가중
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import { instance } from '@/api/instance'

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

  data () {
    return {
      loading: null,
      gameInfo: null
    }
  },

  mounted () {
    this.requestApi()
  },

  methods: {
    async actionCheck (player) {
      this.loading = this.$loading.show()
      const { data } = await apiGameInfo()
      if (!data.success) {
        this.loading.hide()
        this.$toast.error(data.msg)
      } else {
        const { body } = data
        this.gameInfo = body
        if (body.users.indexOf(player) > -1 || body.users.length > 4) {
          this.loading.hide()
          this.$toast.error('참가가 불가 합니다.')
        } else {
          this.actionEnter(player, body)
        }
      }
    },
    async actionEnter (player, gameInfo) {
      gameInfo.users.push(player)
      const { data } = await apiGameUpdate(gameInfo)
      this.loading.hide()
      if (!data.success) {
        this.$toast.error(data.msg)
      } else {
        localStorage.setItem('PAINT-GAME-PLAYER', player)
        this.$router.push('/study/paint-game-in')
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
        this.loading.hide()
      }
    },

    enableCheckIn (player) {
      if (this.gameInfo) {
        if (this.gameInfo.users.indexOf(player) === -1) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }

  }

}
</script>

<style lang="scss" scoped>

  .module-paint-game-ready {
    position: relative;
  }

</style>

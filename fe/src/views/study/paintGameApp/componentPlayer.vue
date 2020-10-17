<template>
  <div class="module-paint-game-player">
    <v-card width="420" height="350">
      <v-card-actions>
        <span>{{`${user} (${role})`}}</span>
        <span v-if="myView">- 나</span>
        <v-spacer></v-spacer>
        <v-btn
          v-if="role === '진행자'"
          text
          :disabled="running"
          @click="actionStartTimer">
          <v-icon left>mdi-bell-ring-outline</v-icon>
          Start
        </v-btn>
      </v-card-actions>
      <v-card-text
        id="scrolled-content"
        :class="classScrolledContents">
        <v-list color="#F2F5F8">
          <v-list-item :key="index" v-for="(item, index) in contents">
            <v-list-item-content>
              <div :class="className(item.user)">
                <span class="chat-user-login">
                  <displayTime :time="item.date" type="normal" />
                  &nbsp;&nbsp;
                  <span class="chat-user-name">{{item.user}}</span>
                  <v-icon dense small color="#94C2ED">mdi-circle</v-icon>
                </span>
              </div>
              <div :class="classContents(item.user)">{{item.text}}</div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-text-field
          v-if="myView"
          flat
          dense
          outlined
          v-model="message"
          class="mt-5"
        ></v-text-field>
      <v-card-actions v-if="myView === true">
        <v-btn text @click="actionExit">
          <v-icon left>mdi-exit-to-app</v-icon>
          Exit
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="actionClear">
          <v-icon left>mdi-cancel</v-icon>
          Clear
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    user: String, //  player-1, player-2, player-3, player-4
    myView: Boolean,
    onExit: Function,
    onStartTimer: Function,
    running: Boolean
  },

  data () {
    return {
      role: this.user === 'player-1' ? '진행자' : '참가자', // 진행자, 참가자
      contents: [], // {user, text, date}
      message: ''
    }
  },

  mounted () {

  },

  methods: {
    actionExit () {
      this.onExit()
    },
    actionClear () {
      this.contents = []
    },
    actionStartTimer () {
      this.onStartTimer()
    }
  },

  computed: {
    classScrolledContents () {
      return this.myView ? 'scrolled-content-my' : 'scrolled-content-other'
    }
  },

  watch: {
    running (newValue, oldValue) {
      console.log('running newValue : ', newValue)
      console.log('running oldValue : ', oldValue)
    }
  }

}
</script>

<style lang="scss" scoped>

  .module-paint-game-player {
    position: relative;

    .scrolled-content-my {
      min-height: 150px;
      max-height: 150px
    }
    .scrolled-content-other {
      min-height: 250px;
      max-height: 250px
    }
  }

</style>

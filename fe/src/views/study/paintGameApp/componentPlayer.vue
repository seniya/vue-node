<template>
  <div class="module-paint-game-player">
    <v-card width="380" height="350" class="elevation-5" :class="classCardMain">
      <v-card-actions>
        <span>{{`${player} (${role})`}}</span>
        <span v-if="myView">- 나</span>
        <v-spacer></v-spacer>
        <v-btn
          v-if="role === '진행자' && myView === true"
          text
          :disabled="running"
          @click="actionStartTimer">
          <v-icon left>mdi-bell-ring-outline</v-icon>
          Start
        </v-btn>
      </v-card-actions>
      <v-card-text class="scrolled-content" :class="classScrolledContents">
        <v-list class="content-list">
          <v-list-item :key="index" v-for="(item, index) in contentsFilterd">
            <v-list-item-content>
              <div>
                <div class="float-left contents-item-text">{{item.text}}</div>
              </div>
              <div>
                <div class="float-right contents-item-time">
                  <displayTime :time="item.date" type="clock" />
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <div class="pl-5 pr-5 mt-5">
        <v-text-field
            v-if="myView"
            flat
            dense
            outlined
            v-model="message"
            class=""
            @keyup.enter="actionSendMessage"
          ></v-text-field>
      </div>
      <v-card-actions v-if="myView === true" class="contents-actions-group">
        <v-btn text @click="actionExit">
          <v-icon left>mdi-exit-to-app</v-icon>
          Exit
        </v-btn>
        <!-- <v-spacer></v-spacer> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import displayTime from '@/components/displayTime.vue'

export default {
  props: {
    player: String, //  player-1, player-2, player-3, player-4
    myView: Boolean,
    onExit: Function,
    onStartTimer: Function,
    onSendMessage: Function,
    running: Boolean,
    contents: Array // {text, time, player}
  },

  components: {
    displayTime
  },

  data () {
    return {
      role: this.player === 'player-1' ? '진행자' : '참가자', // 진행자, 참가자
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
    },
    actionSendMessage () {
      // console.log('actionSendMessage : ', this.message)
      this.onSendMessage(this.message)
      this.message = ''
    }
  },

  computed: {
    classCardMain () {
      let className = ''
      if (this.player === 'player-1') {
        className = 'card-main-player-1'
      } else if (this.player === 'player-2') {
        className = 'card-main-player-2'
      } else if (this.player === 'player-3') {
        className = 'card-main-player-3'
      } else if (this.player === 'player-4') {
        className = 'card-main-player-4'
      }
      return className
    },
    classScrolledContents () {
      return this.myView ? 'scrolled-content-my' : 'scrolled-content-other'
    },
    contentsFilterd () {
      // eslint-disable-next-line no-unused-vars
      const sampleContents = [
        { player: 'player-1', text: '1 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 55555 54333 안녕하세요 안녕하세요 안녕하세요 안녕하세요 55555 54333 안녕하세요 안녕하세요 안녕하세요 안녕하세요 55555 54333', time: 1603004149347 },
        { player: 'player-1', text: '1ㅇㅁㄻㄴㄹ ㄴㅁㄻ ㄴㄴㅁㅇ ㄹㄴ ㄴ', time: 1603004149347 },
        { player: 'player-1', text: '1ㅌㅊㅍㅌㅋㅊㅍㅋㅌㅊㅍㄴㅁㄹ ㅁㄴㅁㅇㄹ ㄴㅁㄹ ㅌㅍ', time: 1603004149347 },
        { player: 'player-1', text: '1ㅁㄴㄹ ㄴㅁㄻㄴ ', time: 1603004149347 },
        { player: 'player-1', text: '1ㅁㄴㄱ쇼됻ㄹㄴ ㅁㄴ ㄹㄴㅁㅇㄹ ㅁㄴㅇㄻㄴㄹ', time: 1603004149347 },
        { player: 'player-1', text: '1ㅇ롱ㄹ ㅇ록ㄷㄷ교굗굑', time: 1603004149347 },
        { player: 'player-1', text: '1ㅌㅋㅍ', time: 1603004149347 },
        { player: 'player-1', text: '1호ㅓㄹ허ㅛ셕셕셗', time: 1603004149347 },
        { player: 'player-2', text: '2화ㅓㅘ호ㅕㅑㅛ셠겨ㅛㄱ서', time: 1603004149347 },
        { player: 'player-2', text: '2ㅌㅊㅍㅋㅌㅍㅌㅋㅍㄴㅇ', time: 1603004149347 },
        { player: 'player-2', text: '2ddd', time: 1603004149347 },
        { player: 'player-2', text: '265856 76 84455 56575', time: 1603004149347 },
        { player: 'player-1', text: '1ㅁㄴㄱ쇼됻ㄹㄴ ㅁㄴ ㄹㄴㅁㅇㄹ ㅁㄴㅇㄻㄴㄹ', time: 1603004149347 },
        { player: 'player-1', text: '1ㅇ롱ㄹ ㅇ록ㄷㄷ교굗굑', time: 1603004149347 },
        { player: 'player-1', text: '1ㅌㅋㅍ', time: 1603004149347 },
        { player: 'player-2', text: '2호ㅓㄹ허ㅛ셕셕셗', time: 1603004149347 },
        { player: 'player-1', text: '1화ㅓㅘ호ㅕㅑㅛ셠겨ㅛㄱ서', time: 1603004149347 },
        { player: 'player-1', text: '1ㅌㅊㅍㅋㅌㅍㅌㅋㅍㄴㅇ', time: 1603004149347 },
        { player: 'player-1', text: '1ddd', time: 1603004149347 },
        { player: 'player-1', text: '1615856 76 84455 56575', time: 1603004149347 },
        { player: 'player-2', text: '2ㅁㄴㄱ쇼됻ㄹㄴ ㅁㄴ ㄹㄴㅁㅇㄹ ㅁㄴㅇㄻㄴㄹ', time: 1603004149347 },
        { player: 'player-1', text: '1ㅇ롱ㄹ ㅇ록ㄷㄷ교굗굑', time: 1603004149347 },
        { player: 'player-2', text: '2ㅌㅋㅍ', time: 1603004149347 },
        { player: 'player-2', text: '2호ㅓㄹ허ㅛ셕셕셗', time: 1603004149347 },
        { player: 'player-2', text: '2화ㅓㅘ호ㅕㅑㅛ셠겨ㅛㄱ서', time: 1603004149347 },
        { player: 'player-2', text: '2ㅌㅊㅍㅋㅌㅍㅌㅋㅍㄴㅇ', time: 1603004149347 },
        { player: 'player-2', text: '2ddd', time: 1603004149347 },
        { player: 'player-1', text: '165856 76 84455 56575', time: 1603004149347 }
      ]

      // const returnValue = this.$_.filter(sampleContents, { player: this.player })
      const returnValue = this.$_.filter(this.contents, { player: this.player })
      // console.log('returnValue : ', returnValue)

      return returnValue
      // return this.contents
    }
  },

  watch: {
    contentsFilterd () {
      const elements = document.getElementsByClassName('scrolled-content')
      // console.log('contentsFilterd elements : ', elements)
      for (const element of elements) {
        element.scrollTop = element.scrollHeight
      }
    }
  }

}
</script>

<style lang="scss" scoped>

  .module-paint-game-player {

    // ::-webkit-scrollbar { display: none; }
    // background-image: url(https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    // background-image: url(https://images.unsplash.com/photo-1533903345306-15d1c30952de?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    // background-image: url(https://images.unsplash.com/photo-1545243424-0ce743321e11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    // background-image: url(https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);

    ::-webkit-scrollbar {
        width: 6px;
        background: #fff;
    }

    ::-webkit-scrollbar-track {        display: none;    }

    // #9b59b6 = rgb(155, 89, 182, 0.4);
    // #3498db = rgb(52, 152, 219, 0.4);
    // #2ecc71 = rgb(46, 204, 113, 0.4);
    // #1abc9c = rgb(26, 188, 156, 0.4);
    // #f1c40f = rgb(241, 196, 15, 0.4);
    // #e67e22 = rgb(230, 126, 34, 0.4);
    // #E73C61 = rgb(231, 60, 97, 0.4);

    position: relative;

    span {
      // color: white;
    }

    .card-main-player-1 {
      background-color: rgb(52, 152, 219, 0.3);
      // background-size: cover;
      // background-image: url(https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    }

    .card-main-player-2 {
      background-color: rgb(46, 204, 113, 0.3);
      // background-size: cover;
      // background-image: url(https://images.unsplash.com/photo-1533903345306-15d1c30952de?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    }

    .card-main-player-3 {
      background-color: rgb(241, 196, 15, 0.3);
      // background-size: cover;
      // background-image: url(https://images.unsplash.com/photo-1545243424-0ce743321e11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    }

    .card-main-player-4 {
      background-color: rgb(230, 126, 34, 0.3);
      // background-size: cover;
      // background-image: url(https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    }

    // .card-main-other {
    //   background-color:rgb(26, 188, 156, 0.5);
    // }

    .scrolled-content-my {
      min-height: 190px;
      max-height: 190px;
      overflow-y: scroll;
      background-color:transparent;
    }
    .scrolled-content-other {
      min-height: 290px;
      max-height: 290px;
      overflow-y: scroll;
      background-color:transparent;
    }

    .content-list {
      background-color: transparent;
    }

    .contents-item-text {
      background-color: #fff;
      font-size: 1.0rem;
      font-weight: 400;
      padding: 7px;
    }

    .contents-item-time {
      font-size: 0.5rem;
    }

    .contents-actions-group {
      margin-top: -30px;
    }

  }

</style>

<template>
  <v-container fluid class="module-study-simple-chat" height="100%">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" class="d-flex justify-center">
        <v-card width="750px" class="elevation-12">
          <v-container class="pa-0">
            <v-row>
              <v-col cols="4" xs="4" sm="4" md="4" class="pa-0">
                <v-card flat color="#666666" height="100%">
                  <v-card-title>
                    <v-icon>mdi-magnify</v-icon>
                    <v-text-field></v-text-field>
                  </v-card-title>
                  <v-card-text
                    style="min-height: 400px; max-height: 400px"
                    class="scroll-y overflow-y-auto">
                    <v-list color="#666666"><!-- 444753 -->
                      <v-list-item-group color="primary" :key="index" v-for="(item, index) in users">
                      <v-list-item >
                        <v-list-item-avatar>
                          <v-img :src="item.avatar" light></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-html="item.name" class="list-user-name"></v-list-item-title>
                          <v-list-item-subtitle class="list-user-login">
                            <v-icon dense small color="#86BB71">mdi-circle</v-icon>
                            &nbsp;
                            <displayTime :time="item.login * 1000" type="normal"/>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider v-if="index !== users.length-1" :key="index"></v-divider>
                      </v-list-item-group>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="8" xs="8" sm="8" md="8" class="pa-0">
                <v-card flat color="#F2F5F8">
                  <v-card-title>
                    <v-list-item-avatar>
                      <v-img v-if="avatar" :src="avatar"></v-img>
                    </v-list-item-avatar>
                    <span class="title font-weight-light">
                      {{myName}}
                    </span>
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-card-text
                    id="scrolled-content"
                    style="min-height: 450px; max-height: 450px"
                    class="scrolled-content">
                    <v-list color="#F2F5F8">
                      <v-list-item :key="index" v-for="(item, index) in contents">
                        <v-list-item-content>
                          <div v-if="myName !== item.user" v-bind:class="nameClass(item.user)">
                            <span class="chat-user-login">
                              <v-icon dense small color="#86BB71">mdi-circle</v-icon>
                              <span class="chat-user-name">{{item.user}}</span>
                              &nbsp;&nbsp;
                              <displayTime :time="item.date" type="normal"/>
                            </span>
                          </div>
                          <div v-else v-bind:class="nameClass(item.user)">
                            <span class="chat-user-login">
                              <displayTime :time="item.date" type="normal" />
                              &nbsp;&nbsp;
                              <span class="chat-user-name">{{item.user}}</span>
                              <v-icon dense small color="#94C2ED">mdi-circle</v-icon>
                            </span>
                          </div>
                          <div v-if="item.image && item.image !== ''" v-bind:class="contentsClass(item.user)">
                            <v-img
                              max-height="250"
                              max-width="250"
                              :src="item.image"
                              @click="actionOpenImage(item.image)"
                            />
                          </div>
                          <div v-else v-bind:class="contentsClass(item.user)">{{item.text}}</div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-text class="pl-10 pr-10 pt-5 pb-0">
                    <v-textarea
                      solo
                      flat
                      dense
                      outlined
                      no-resize
                      rows="3"
                      v-model="message"
                    ></v-textarea>
                  </v-card-text>
                  <v-card-actions class="chat-actions-block">
                    <v-file-input
                      accept="image/*"
                      dense
                      hide-input
                      prepend-icon="mdi-camera"
                      v-model="imageFiles"
                      @change="actionFileUpload"
                    ></v-file-input>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="actionSendMessage">
                      SEND
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog persistent v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline">
          이름을 설정하세요
        </v-card-title>
        <v-card-text>
          어떤 정보도 저장되지 않습니다.
        </v-card-text>
        <v-card-text>
          <v-text-field
          v-model="myName"
          placeholder="이름입력"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="$router.push('/')">
            나가기
          </v-btn>
          <v-btn
            color="primary"
            text
            :disabled="!myName"
            @click="actionSetName">
            입장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import io from 'socket.io-client'
import displayTime from '@/components/displayTime.vue'
import { instance } from '@/api/instance'

function apiFileUpload (fdata) {
  return instance({
    method: 'POST',
    url: '/demo/upload-study',
    data: fdata
  })
}

export default {
  components: {
    displayTime
  },
  data () {
    return {
      elem: null,
      dialog: true,
      socket: null,
      myName: 'anyName',
      message: '',
      avatar: null,
      imageFiles: [],
      users: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          name: '홍길동',
          login: '1602423163050'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          name: '철수',
          login: '1602423163050'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          name: '영희',
          login: '1602423163050'
        }
      ],
      contents: [
        {
          text: '안녕하세요. 바른말 고운말 좋은 하루 보내요',
          time: Date.now(),
          image: '',
          user: '콤퓨터'
        }
      ]
    }
  },
  destroyed () {
    if (this.socket) {
      this.socket.close()
    }
  },
  methods: {
    nameClass: function (name) {
      return {
        'other-title': this.myName !== name,
        'my-title': this.myName === name
      }
    },
    contentsClass: function (name) {
      return {
        message: true,
        'other-message': this.myName !== name,
        'my-message': this.myName === name
      }
    },
    initSocket () {
      console.log('initSocket')
      const ioUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/study/simple-chat' : 'https://seniya2.iptime.org/study/simple-chat'
      // this.socket = io(ioUrl) //, {secure: true}
      this.socket = io(ioUrl, { secure: true, transports: ['websocket'] })
      this.socket.on('connect', () => {
        this.actionStoreClient()
        this.$toast.success('접속 되었습니다.')
      })
      this.socket.on('resServerChat', (data) => {
        this.actionsReceiveText(data)
      })
      this.socket.on('resNewUser', (data) => {
        if (data.user !== this.myName) {
          this.$toast.success('새로운 유저 등장!')
        }
        this.users = data
      })
      this.socket.on('resOutUser', (data) => {
        if (data.user !== this.myName) {
          this.$toast.success('다른 유저가 퇴장하였습니다.')
        }
        this.users = data
      })
      this.socket.on('disconnect', () => {
        this.$toast.success('연결이 종료 되었습니다.')
      })
    },
    actionSetName () {
      const iname = this.myName + '' + Date.now()
      const sliceRs = iname.slice(-5)
      const name = this.myName + '_' + sliceRs
      this.myName = name
      this.dialog = false
      this.initSocket()
    },
    actionSendMessage () {
      if (this.message === null || this.message === '') {
        this.$toast.warning('텍스트를 입력해 주세요')
        return
      }
      const content = {
        text: this.message,
        time: Date.now(),
        image: '',
        user: this.myName
      }
      this.message = ''
      if (this.socket) {
        this.socket.emit('reqServerChat', content)
      }
    },
    actionSendImage (url) {
      if (url === null || url === '') {
        this.$toast.warning('이미지를 선택하세요')
        return
      }
      const content = {
        text: '이미지',
        time: Date.now(),
        image: url,
        user: this.myName
      }
      this.message = ''
      if (this.socket) {
        this.socket.emit('reqServerChat', content)
      }
    },
    actionStoreClient () {
      let randomInt = parseInt(Math.random() * 10)
      if (randomInt === 0) randomInt = 1
      if (randomInt > 5) randomInt = 5
      this.avatar = `https://cdn.vuetifyjs.com/images/lists/${randomInt}.jpg`
      this.socket.emit('reqStoreClient', {
        name: this.myName,
        avatar: this.avatar
      })
    },
    actionsReceiveText (data) {
      console.log('actionsReceiveText data', data)
      this.$vuetify.goTo(0)
      this.contents.push(data)

      this.elem = document.getElementById('scrolled-content')
      setTimeout(() => {
        this.elem.scrollTop = 1000000
      }, 0)
    },

    async actionFileUpload (file_) {
      // this.imageFiles = []
      // console.log('file : ', file_)

      const fdata = new FormData()
      fdata.append('file', file_)
      const { data } = await apiFileUpload(fdata)
      const { url } = data.body
      console.log(url)
      this.actionSendImage(url)
    },

    actionOpenImage (url) {
      console.log('actionOpenImage : ', url)
      window.open(url, '_blank')
    }

  }
}
</script>

<style lang="scss" scoped>

.module-study-simple-chat {
  background-color: #C5DDEB;
}
.chat-actions-block {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 0px;
  margin-top: -10px;
  padding-bottom: 15px;
}

.list-user-name {
  color: white;
}

.list-user-login {
  color: #92959E !important;
}

.chat-user-name {
  color: #434651;
}

.chat-user-login {
  color: #a8aab1;
}

.scrolled-content {
  overflow-y: scroll;
}

.other-title {
  text-align: left;
}

.my-title {
  text-align: right;
}

.other-message {
  background: #86BB71;
}

.other-message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #86BB71;
  border-width: 10px;
  margin-left: -10px;
}

.my-message {
  background: #94C2ED;
}

.my-message:after {
  bottom: 100%;
  left: 93%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #94C2ED;
  border-width: 10px;
  margin-left: -10px;
}

.message {
    color: white;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    margin-top: 10px;
    width: 90%;
    position: relative;
}

</style>

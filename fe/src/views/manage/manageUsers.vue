<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="user in items" :key="user._id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>
            <h3>{{user.name|| 'no-name'}} </h3>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text>
            <div>이름: {{user.name}}</div>
            <div>권한: {{user.lv}}</div>
            <div>나이: {{user.age}}</div>
            <div>로그인 횟수: {{user.inCnt}}</div>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn outlined color="primary" @click="openDialog(user)">수정</v-btn>
            <v-btn outlined color="error" @click="remove(user._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert :value="!items.length" type="warning">
      데이터가 없습니다
    </v-alert>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="이름"
                  hint="홍길동"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  :items="userLvs"
                  label="권한"
                  required
                  v-model="userLv"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  :items="userAges"
                  label="나이"
                  required
                  v-model="userAge"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="update">수정</v-btn>
          <v-btn color="blue darken-1" text @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</v-container>
</template>
<script>

export default {
  data () {
    return {
      items: [],
      dialog: false,
      userAges: [],
      userLvs: [],
      userAge: 0,
      userLv: 0,
      userName: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    for (let i = 0; i < 4; i++) this.userLvs.push(i)
    this.list()
  },
  methods: {
    async list () {
      try {
        const data = await this.$store.dispatch('manage/USER_INFO')
        this.items = data
      } catch (error) {
        this.$store.commit('pop', { msg: error.message, color: 'warning' })
      }
    },
    async update () {
      this.dialog = false
      try {
        const fdata = {
          name: this.userName, lv: this.userLv, age: this.userAge
        }
        const data = await this.$store.dispatch('manage/USER_UPDATE', { id: this.putId, data: fdata })
        if (!data.success) throw new Error(data.msg)
        this.$store.commit('pop', { msg: '유저 수정 완료', color: 'success' })
        this.list()
      } catch (error) {
        this.$store.commit('pop', { msg: error.message, color: 'error' })
      }
    },
    async remove (id) {
      try {
        await this.$store.dispatch('manage/USER_REMOVE', { id })
        this.$store.commit('pop', { msg: '유저 삭제 완료', color: 'success' })
        this.list()
      } catch (error) {
        this.$store.commit('pop', { msg: error.message, color: 'error' })
      }
    },
    openDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userLv = user.lv
      this.userAge = user.age
    }
  }
}
</script>

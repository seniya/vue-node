<template>
  <v-container>
    <v-row align-center justify-center>
      <v-col>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>로그인 폼</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="mdi-account" v-model="form.id" label="아이디" type="text"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" v-model="form.pwd" label="비밀번호" type="password"></v-text-field>
              <v-checkbox
                v-model="form.remember"
                label="암호 기억하기(최대 7일간 보관 됩니다.)"
              ></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        id: '',
        pwd: '',
        remember: false
      }
    }
  },
  methods: {
    signIn () {
      axios.post(`${process.env.VUE_APP_API}/sign/in`, this.form)
        .then(r => {
          console.log(r.data)
          if (!r.data.success) return console.error(r.data.msg)
          localStorage.setItem('token', r.data.token)
          this.$store.commit('getToken')
          this.$router.push('/')
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>

<style>

</style>

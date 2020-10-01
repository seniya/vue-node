<template>
  <v-container>
    <v-btn @click="apiWithToken">토큰과 함께 전송</v-btn>
    <v-btn @click="apiWithTrash">이상한 문자와 함께 전송</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    headerSend () {
      axios.get(`${process.env.VUE_APP_API}/test`, { headers: { Authorization: 'fake token!', xxx: 1234 } })
        .then(r => console(r))
        .catch(e => console.log(e))
    },
    apiWithToken () {
      const token = localStorage.getItem('token')
      axios.get(`${process.env.VUE_APP_API}/test`, { headers: { Authorization: token } })
        .then(r => console.log(r.data))
        .catch(e => console.log(e.message))
    },
    apiWithTrash () {
      axios.get(`${process.env.VUE_APP_API}/test`, { headers: { Authorization: 'abcdefghijk' } })
        .then(r => console.log(r.data))
        .catch(e => console.log(e.message))
    }
  }

}

</script>

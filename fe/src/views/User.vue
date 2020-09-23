<template>
  <v-container class="grey lighten-5">
<!--
    <v-row hidden>
      <v-col v-for="(user, i) in users" :key="i">
        <v-chip close>{{user.name}}</v-chip>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{user.name}}</h3>
              <div>{{user.age}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text color="orange">Share</v-btn>
            <v-btn text color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->

    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-card outlined tile>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">get</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="getMd"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="getReq">getReq</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">post</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="postMd"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="postReq">postReq</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">put</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="putMd"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="putReq">putReq</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">delete</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="delMd"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="delReq">delReq</v-btn>
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
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: ''
    }
  },
  methods: {
    getReq () {
      console.log('')
      this.requestAPI('get')
    },
    postReq () {
      console.log('post')
      this.requestAPI('post', { name: '안녕', age: 11 })
    },
    putReq () {
      console.log('put')
      this.requestAPI('put', { user: 'putMan' })
    },
    delReq () {
      console.log('')
      this.requestAPI('delete', { user: 'deleteMan' })
    },
    requestAPI (type, reqData) {
      axios[type]('http://localhost:3000/api/user', reqData)
        .then(r => {
          this.users = r.data.users
          if (type === 'get') {
            this.getMd = JSON.stringify(r.data)
          } else if (type === 'post') {
            this.postMd = JSON.stringify(r.data)
          } else if (type === 'put') {
            this.putMd = JSON.stringify(r.data)
          } else if (type === 'delete') {
            this.delMd = JSON.stringify(r.data)
          }
        })
        .catch(e => {
          console.error(e.message)
        })
    }
  },
  mounted () {

  }
}
</script>

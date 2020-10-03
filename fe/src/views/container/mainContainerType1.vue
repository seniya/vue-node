<template>
  <v-app app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.subItems"
            :key="child.title"
            :to="child.to"
            :prepend-icon="child.icon"
            link
          >
            <v-list-item-content >
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="siteInfo.title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item  @click="moveMain">
            <v-list-item-title>홈으로</v-list-item-title>
          </v-list-item>
          <template v-if="!$store.state.auth.token">
            <v-list-item @click="$router.push('/sign/in')">
              <v-list-item-title>로그인</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/sign/up')">
              <v-list-item-title>회원가입</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item v-else @click="$router.push('/sign/out')">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main app>
      <router-view />
    </v-main>

    <v-footer app >
      <span class="white--text">{{siteInfo.copyright}}</span>
    </v-footer>

    <v-snackbar app v-model="$store.state.sb.act" :color="$store.state.sb.color">
      {{ $store.state.sb.msg }}
      <v-btn text @click="$store.commit('pop', { act: false })">닫기</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { getSiteMenu } from '@/util/common'

export default {
  name: 'Main',
  data () {
    return {
      drawer: null,
      items: getSiteMenu(),
      siteInfo: {
        copyright: '',
        dark: '',
        title: ''
      }
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    moveMain () {
      const currentUrl = window.location.pathname
      if (currentUrl !== '/') {
        this.$router.push('/')
      } else {
        this.$store.commit('pop', { msg: '지금 페이지야', color: 'warning' })
      }
      console.log(currentUrl)
    },
    async getSite () {
      try {
        this.siteInfo = await this.$store.dispatch('auth/SITE_INFO')
      } catch (error) {
        this.$store.commit('pop', { msg: error.message, color: 'warning' })
      }
    }
  }
}
</script>

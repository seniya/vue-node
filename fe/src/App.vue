<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app stateless>
      <v-list dense>
        <v-list-item link
        v-for="(item, i) in items"
          :key="i"
          :to="item.to">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="siteTitle"></v-toolbar-title>
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
          <v-list-item  @click="$router.push('/')">
            <v-list-item-title>홈으로</v-list-item-title>
          </v-list-item>
          <template v-if="!$store.state.token">
            <v-list-item @click="$router.push('/sign')">
              <v-list-item-title>로그인</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/register')">
              <v-list-item-title>회원가입</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item v-else @click="signOut">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main app>
      <router-view/>
    </v-main>
    <v-footer app>
      <span class="white--text">{{siteCopyright}}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      siteTitle: '기다리는중',
      siteCopyright: '기다리는중',
      siteDark: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'lv0',
          to: {
            path: '/'
          }
        },
        {
          icon: 'mdi-home',
          title: 'lv1',
          to: {
            path: '/lv1'
          }
        },
        {
          icon: 'mdi-home',
          title: 'lv2',
          to: {
            path: '/lv2'
          }
        },
        {
          icon: 'mdi-home',
          title: 'lv3',
          to: {
            path: '/lv3'
          }
        },
        {
          icon: 'mdi-face',
          title: '사용자관리',
          to: {
            path: '/user'
          }
        },
        {
          icon: 'mdi-face',
          title: '페이지관리',
          to: {
            path: '/page'
          }
        },
        {
          icon: 'mdi-sitemap',
          title: '사이트관리',
          to: {
            path: '/site'
          }
        },
        {
          icon: 'mdi-face',
          title: 'header',
          to: {
            path: '/header'
          }
        }
      ],
      title: this.$apiRootPath
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('delToken')
      this.$router.push('/')
    },
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          console.log(r.data.d)
          this.siteTitle = r.data.d.title
          this.siteCopyright = r.data.d.copyright
          this.siteDark = r.data.d.dark
          this.$vuetify.theme.dark = this.siteDark
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>

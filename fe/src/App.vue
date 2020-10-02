<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app stateless>
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
<!--
      <v-list dense>
        <v-list-group
          v-for="(item, i) in items"
          v-model="item.act"
          :prepend-icon="item.icon"
          :key="i"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list> -->

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

    <v-snackbar
       v-model="$store.state.sb.act"
       :color="$store.state.sb.color"
     >
       {{ $store.state.sb.msg }}
       <v-btn
         flat
         @click="$store.commit('pop', { act: false })"
       >
         닫기
       </v-btn>
     </v-snackbar>
  </v-app>
</template>

<script>
// this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })

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
          icon: 'mdi-view-dashboard',
          title: '현황',
          act: true,
          subItems: [
            {
              title: '오늘',
              to: {
                path: '/'
              }
            }
          ]
        },
        {
          icon: 'mdi-chat',
          title: '끄적끄적',
          act: true,
          subItems: [
            {
              icon: 'home',
              title: 'anyone',
              to: {
                path: '/board/anyone'
              }
            },
            {
              icon: 'home',
              title: 'test',
              to: {
                path: '/board/test'
              }
            }
          ]
        },
        {
          icon: 'mdi-pen',
          title: '레벨테스트',
          act: true,
          subItems: [
            {
              icon: 'mdi-home',
              title: '손님용 페이지',
              to: {
                path: '/test/lv3'
              }
            },
            {
              icon: 'mdi-paw',
              title: '일반유저용 페이지',
              to: {
                path: '/test/lv2'
              }
            },
            {
              icon: 'mdi-pan',
              title: '슈퍼유저용 페이지',
              to: {
                path: '/test/lv1'
              }
            },
            {
              icon: 'mdi-parachute',
              title: '관리자용 페이지',
              to: {
                path: '/test/lv0'
              }
            }
          ]
        },
        {
          icon: 'mdi-cogs',
          title: '관리메뉴',
          subItems: [
            {
              icon: 'mdi-face',
              title: '사용자관리',
              to: {
                path: '/manage/users'
              }
            },
            {
              icon: 'mdi-book-open-page-variant',
              title: '페이지관리',
              to: {
                path: '/manage/pages'
              }
            },
            {
              icon: 'mdi-sitemap',
              title: '사이트관리',
              to: {
                path: '/manage/sites'
              }
            },
            {
              icon: 'mdi-bulletin-board',
              title: '게시판관리',
              to: {
                path: '/manage/boards'
              }
            }
          ]
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

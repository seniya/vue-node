<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      stateless
    >
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

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      {
        icon: 'mdi-chart-bubble',
        title: '홈',
        to: {
          path: '/'
        }
      },
      {
        icon: 'mdi-home',
        title: '사용자관리',
        to: {
          path: '/about'
        }
      },
      {
        icon: 'mdi-help',
        title: 'Help',
        to: {
          path: '/help'
        }
      }
    ]
  })
}
</script>

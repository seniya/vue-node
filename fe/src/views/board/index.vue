<template>
  <v-container >
    <v-toolbar dense class="elevation-3">
      <v-toolbar-title v-if="board">{{board.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeListType('card')">
        <v-icon>mdi-card-bulleted</v-icon>
      </v-btn>
      <v-btn icon @click="changeListType('list')">
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
    </v-toolbar>

    <ListTable
      v-if="siteInfo.listType === 'list' && board"
      :paramBoardName="board.name"
      :board="board"
      :onMoveToRead="moveToRead" />

    <CardTable
      v-if="siteInfo.listType === 'card' && board"
      :paramBoardName="board.name"
      :board="board"
      :onMoveToRead="moveToRead" />

    <v-btn
      color="pink"
      dark
      small
      absolute
      bottom
      right
      fab
      @click="moveToAdd"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-container>
</template>
<script>
import ListTable from '@/views/board/component/listTable.vue'
import CardTable from '@/views/board/component/cardTable.vue'

export default {
  components: { ListTable, CardTable },
  data () {
    return {
      paramBoardName: null,
      board: null,
      siteInfo: null
    }
  },
  watch: {
    '$route' (to, from) {
      this.reloadPage(to)
    }
  },
  created () {
    this.paramBoardName = this.$route.params.name
    this.siteInfo = this.$store.getters['auth/getSiteInfo']
    console.log('siteInfo : ', this.siteInfo)
    this.getBoard()
  },
  methods: {
    changeListType (type) {
      this.siteInfo = this.$store.getters['auth/getSiteInfo']
      this.siteInfo.listType = type
      this.$store.dispatch('manage/SITE_INFO')
      this.updateSiteInfo()
    },
    reloadPage (route) {
      this.paramBoardName = route.params.name
      this.getBoard()
    },
    async updateSiteInfo () {
      this.dialog = false
      try {
        const data = await this.$store.dispatch('manage/SITE_UPDATE', { id: this.siteInfo._id, data: this.siteInfo })
        if (!data.success) throw new Error(data.msg)
        this.$toast.success('설정 저장 완료')
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async getBoard () {
      try {
        const data = await this.$store.dispatch('board/BOARD_INFO', { id: this.paramBoardName })
        if (!data.success) {
          this.articles = []
          throw new Error(data.msg)
        }
        this.board = data.body
      } catch (error) {
        this.articles = []
        this.$toast.error(error.message)
      }
    },
    moveToAdd () {
      this.$router.push(`/board/${this.paramBoardName}/add`)
    },

    moveToRead (atc) {
      this.$router.push(`/board/${this.paramBoardName}/${atc._id}`)
    }
  }
}
</script>

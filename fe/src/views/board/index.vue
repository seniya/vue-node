<template>
  <v-container >
    <v-toolbar dense class="elevation-3">
      <v-toolbar-title v-if="board">{{board.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeListType('card')">
        <v-icon>mdi-card-bulleted</v-icon>
      </v-btn>
      <v-btn icon @click="changeListType('list')">
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
      <v-btn icon @click="moveToAdd" class="ml-3">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <ListTable
      v-if="listType === 'list' && board"
      :paramBoardName="board.name"
      :board="board"
      :onMoveToRead="moveToRead"
      :key="board._id"/>

    <CardTable
      v-if="listType === 'card' && board"
      :paramBoardName="board.name"
      :board="board"
      :onMoveToRead="moveToRead"
      :key="board._id"/>
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
      listType: null
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('index.vue router change')
      this.reloadPage(to)
    }
  },
  created () {
    this.paramBoardName = this.$route.params.name
    this.listType = this.$store.getters['auth/getListType']
    this.getBoard()
  },
  methods: {
    async changeListType (type) {
      this.listType = await this.$store.dispatch('auth/CHANGE_LIST_TYPE', type)
      console.log('this.listType : ', this.listType)
    },
    reloadPage (route) {
      this.paramBoardName = route.params.name
      this.getBoard()
    },
    async getBoard () {
      try {
        const data = await this.$store.dispatch('board/BOARD_INFO', { id: this.paramBoardName })
        if (!data.success) {
          throw new Error(data.msg)
        }
        this.board = data.body
      } catch (error) {
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

<template>
  <v-container >
    <v-row >
      <v-col cols="12">
        <v-data-table
          v-if="meta"
          :server-items-length="meta.totalDocs"
          :options.sync="meta"
          :headers="headerArray"
          :items="articles"
          :loading="isLoading"
          item-key="_id"
          class="elevation-1"
          >

          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item._id">
                <td>{{ item.category }}</td>
                <td>
                  <a @click="moveToRead(item)">
                    {{ item.title }}
                  </a>
                </td>
                <td>{{ item.cnt.view }}</td>
                <td>{{ item.cnt.like }}</td>
                <td>{{ item._user.name || 'guest'}}</td>
                <td><displayTime :time=" item.createDate" /></td>
                <td><displayTime :time=" item.updateDate" /></td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

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
import displayTime from '@/components/displayTime.vue'

export default {
  components: { displayTime },
  data () {
    return {
      paramBoardName: '',
      board: null,
      meta: {
        page: 1,
        itemsPerPage: 10,
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
        sortBy: [],
        sortDesc: [],
        totalDocs: 0,
        paramBoardName: this.$route.params.name
      },
      articles: [],
      headerArray: [
        { text: 'Category', value: 'category' },
        { text: 'Title', value: 'title' },
        { text: 'View', value: 'view' },
        { text: 'Like', value: 'like' },
        { text: 'User', value: '_user' },
        { text: 'createDate', value: 'createDate' },
        { text: 'updateDate', value: 'updateDate' }
      ],
      isLoading: true
    }
  },
  watch: {
    meta: {
      handler (val, oldVal) {
        if (oldVal === null) return
        // console.log('meta handler : ', val)
        // console.log('meta page : ', oldVal.page, val.page)
        // console.log('meta itemsPerPage : ', oldVal.itemsPerPage, val.itemsPerPage)
        if (val.paramBoardName === oldVal.paramBoardName) {
          if (
            val.page !== oldVal.page ||
            val.itemsPerPage !== oldVal.itemsPerPage ||
            val.sortBy !== oldVal.sortBy ||
            val.sortDesc !== oldVal.sortDesc) {
            this.getArticles(val)
            // console.log('meta ----action-------- ')
          } else {
            // console.log('meta ------------------- ')
          }
        }

        /* */
      },
      deep: true
    },
    '$route' (to, from) {
      this.reloadPage(to)
    }
  },
  mounted () {
    console.log('mounted')
    this.paramBoardName = this.$route.params.name
    this.getBoard()
    this.isLoading = true
  },
  methods: {
    reloadPage (route) {
      this.meta = {
        page: 1,
        itemsPerPage: 10,
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
        sortBy: [],
        sortDesc: [],
        totalDocs: 0,
        paramBoardName: route.params.name
      }
      this.paramBoardName = route.params.name
      this.getBoard()
    },
    async getBoard () {
      try {
        const data = await this.$store.dispatch('board/BOARD_INFO', { id: this.paramBoardName })
        if (!data.success) {
          this.articles = []
          throw new Error(data.msg)
        }
        this.board = data.body
        this.getArticles()
      } catch (error) {
        this.articles = []
        this.$toast.error(error.message)
      }
    },
    async getArticles () {
      this.isLoading = true
      try {
        const data = await this.$store.dispatch('article/ARTICLE_ITEMS', { id: this.board._id, gdata: this.meta })
        if (!data.success) throw new Error(data.msg)
        console.log('getArticles : ', data)
        this.articles = data.body.docs
        this.meta.itemsPerPage = data.body.meta.itemsPerPage
        this.meta.page = data.body.meta.page
        this.meta.totalDocs = data.body.meta.totalDocs
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.isLoading = false
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

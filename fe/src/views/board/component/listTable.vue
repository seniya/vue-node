<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        v-if="meta"
        :server-items-length="meta.totalDocs"
        :options.sync="meta"
        :headers="headerArray"
        :items="articles"
        :loading="isLoading"
        item-key="_id"
        class="elevation-3"
        >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>{{ item.category }}</td>
              <td>
                <a @click="onMoveToRead(item)">
                  {{ item.title }}
                </a>
              </td>
              <td>{{ item.cnt.view }}</td>
              <td>{{ item._user.name || 'guest'}}</td>
              <td><displayTime :time=" item.updateDate" /></td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import displayTime from '@/components/displayTime.vue'

export default {
  components: { displayTime },
  props: {
    paramBoardName: {
      type: String,
      required: true
    },
    board: {
      type: Object,
      required: true
    },
    onMoveToRead: {
      type: Function,
      required: true
    }
  },
  mounted () {
    this.getArticles()
    this.isLoading = true
  },
  data () {
    return {
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
        paramBoardName: this.paramBoardName
      },
      boardId: this.board._id,
      articles: [],
      headerArray: [
        { text: 'Category', value: 'category' },
        { text: 'Title', value: 'title' },
        { text: 'View', value: 'view' },
        { text: 'User', value: '_user' },
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
      },
      deep: true
    }
  },
  methods: {
    async getArticles () {
      this.isLoading = true
      try {
        const data = await this.$store.dispatch('article/ARTICLE_ITEMS', { id: this.boardId, gdata: this.meta })
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
    }
  }
}
</script>

<style>

</style>

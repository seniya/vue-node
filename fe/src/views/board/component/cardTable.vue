<template>
  <v-container >
  <v-row v-if="articles">
    <v-col
      v-for="(item, index) in articles"
      :key="index"
      cols="12"
      xs="12"
      sm="6"
      md="4">
      <v-hover v-slot:default="{ hover }">

        <v-card
          :elevation="hover ? 12 : 2"
          :class="{ 'on-hover': hover }"
          @click="onMoveToRead(item)"
        >
          <v-card-title>{{ item.category }}</v-card-title>
          <v-card-subtitle>
            <div class="text-h6 text-truncate">{{ item.title }}</div>
            <div class="text-subtitle-2">{{ item.subTitle }}</div>
          </v-card-subtitle>
          <v-card-text>
            <div>
              작성일 : <displayTime :time=" item.createDate" />
            </div>
            <div>
              수정일 : <displayTime :time=" item.updateDate" />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon class="mr-1">mdi-google-lens</v-icon>
            <span class="subheading mr-2">{{ item.cnt.view }}</span>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-if="!isCompleted">
      <v-card v-intersect="onIntersect" class="elevation-0">
        <v-card-text class="d-flex justify-center">
          <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
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
    // this.paramBoardName = this.$route.params.name
    this.getArticles()
    this.isLoading = true
  },
  data () {
    return {
      meta: {
        page: 1,
        itemsPerPage: 15,
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
        { text: 'Like', value: 'like' },
        { text: 'User', value: '_user' },
        { text: 'createDate', value: 'createDate' },
        { text: 'updateDate', value: 'updateDate' }
      ],
      isLoading: true,
      isCompleted: false
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
        // console.log('getArticles : ', data)
        // this.articles = data.body.docs
        const oladArticles = this.$_.cloneDeep(this.articles)

        if (data.body.docs.length === 0) {
          this.isCompleted = true
        }
        // for (let i = 0; i < data.body.docs.length; i++) {
        //   oladArticles.push(data.body.docs[i])
        // }
        oladArticles.push(...data.body.docs)
        this.articles = oladArticles
        this.meta.itemsPerPage = data.body.meta.itemsPerPage
        this.meta.page = data.body.meta.page
        this.meta.totalDocs = data.body.meta.totalDocs
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.isLoading = false
      }
    },
    onIntersect (entries, observer, isIntersecting) {
      // console.log('onIntersect ', entries, observer, isIntersecting)
      if (isIntersecting === true && this.isLoading === false) {
        if (this.isCompleted === true) {
          this.$toast.success('더이상 게시글이 없습니다')
        } else {
          this.isLoading = true
          setTimeout(() => {
            // console.log('--------- getArticles -----------')
            this.meta.page = this.meta.page + 1
            this.getArticles()
          }, 500)
        }
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: opacity .2s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>

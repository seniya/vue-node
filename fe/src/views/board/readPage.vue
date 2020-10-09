<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="article">
          <v-card-title>{{ article.title }}</v-card-title>
          <v-card-title>{{ article.subTitle }}</v-card-title>

          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="4"> 종류 </v-col>
                <v-col cols="12" sm="8"> 태그 </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <div v-if="article" v-html="article.contentHtml" class="conetent-read"></div>
            <EditorComponent v-if="false" :content="article.content" />
          </v-card-text>

          <v-card-actions>
            <v-btn text color="primary" @click="moveToList">
              <v-icon left>mdi-list-status</v-icon> List
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="moveToModify">
              <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>
            <v-btn text color="primary" @click="deleteConfirm">
              <v-icon left>mdi-trash-can</v-icon> delete
            </v-btn>
          </v-card-actions>

          <v-spacer class="mb-10" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="comments">
          <Disqus shortname="shortname" @new-comment="newComment" /><!--  -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Disqus } from 'vue-disqus'
import EventBus from '@/util/EventBus'
import EditorComponent from '@/views/board/component/editorComponent.vue'

export default {
  components: {
    EditorComponent,
    Disqus
  },
  data () {
    return {
      boardName: this.$route.params.name,
      articleId: this.$route.params.articleid,
      article: null,
      editor: null
    }
  },
  mounted () {
    this.readArticle(this.articleId)
  },
  methods: {
    deleteConfirm () {
      console.log('deleteConfirm')
      EventBus.$emit('start:alertDialog', {
        title: '',
        text: '삭제하시겠습니까?',
        type: 2,
        confirmEvent: this.removeArticle
      })
    },
    newComment ({ id, text }) {
      console.log('newComment id, text', id, text)
    },
    async readArticle (id) {
      try {
        const data = await this.$store.dispatch('article/ARTICLE_READ', { id })
        setTimeout(() => {
          this.article = data.body
        }, 0)
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async removeArticle () {
      try {
        const data = await this.$store.dispatch('article/ARTICLE_REMOVE', {
          id: this.articleId
        })
        if (data.success) {
          this.$toast.success('삭제되었습니다.')
          this.moveToList()
        } else {
          throw new Error(data.msg)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    moveToList () {
      this.$router.push(`/board/${this.boardName}`)
    },
    moveToModify () {
      this.$router.push(`/board/${this.boardName}/${this.articleId}/modify`)
    }
  }

}
</script>

<style lang="scss">
  .conetent-read {
    .ce-toolbar {
      display: none !important;
    }
    .ce-inline-toolbar {
      display: none !important;
    }
    .codex-editor-overlay {
      display: none !important;
    }
  }
</style>

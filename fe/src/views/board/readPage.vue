<template>
  <v-container>

    <v-toolbar dense class="elevation-3">
      <v-toolbar-title v-if="board">{{board.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="moveToList">
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.auth.user.lv === 0" icon class="ml-5" @click="moveToModify">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.auth.user.lv === 0" icon @click="deleteConfirm">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row>
      <v-col cols="12">
        <v-card v-if="article">
          <v-card-title>{{ article.title }}</v-card-title>
          <v-card-subtitle>{{ article.subTitle }}</v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="4"> 종류 : {{article.category}} </v-col>
                <v-col cols="12" sm="8"> 태그 : {{article.tags.toString()}}</v-col>
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
              <v-icon left>mdi-format-list-bulleted</v-icon> List
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="$store.state.auth.user.lv === 0" text color="primary" @click="moveToModify">
              <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>
            <v-btn v-if="$store.state.auth.user.lv === 0" text color="primary" @click="deleteConfirm">
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
          <commentComponent />
        </div>
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      fixed
      small
      bottom
      right
      fab
      @click="$vuetify.goTo(0)"
    >
      <v-icon>mdi-arrow-collapse-up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import EventBus from '@/util/EventBus'
import EditorComponent from '@/views/board/component/editorComponent.vue'
import commentComponent from '@/views/board/component/commentComponent.vue'

export default {
  components: {
    EditorComponent,
    commentComponent
  },
  data () {
    return {
      boardName: this.$route.params.name,
      articleId: this.$route.params.articleid,
      article: null,
      editor: null,
      board: null
    }
  },
  mounted () {
    this.readBoard()
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
        setTimeout(() => {
          const editableElements = document.querySelectorAll('[contenteditable=true]')
          editableElements.forEach(el => el.removeAttribute('contenteditable'))
        }, 0)
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async readBoard () {
      try {
        const data = await this.$store.dispatch('board/BOARD_INFO', { id: this.boardName })
        if (!data.success) {
          throw new Error(data.msg)
        }
        this.board = data.body
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
    margin-top: 50px;
    .ce-block {
      margin-bottom: 20px;
    }
    .ce-toolbar {
      display: none !important;
    }
    .ce-inline-toolbar {
      display: none !important;
    }
    .codex-editor-overlay {
      display: none !important;
    }
    .codex-editor__redactor {
      padding-bottom: 50px !important;
    }
    .ce-block__content {
      // min-width: 600px !important;
      margin: auto;
      max-width: 650px !important;
    }
    .ce-toolbar__content {
      max-width: 650px !important;
    }

    .cdx-quote__text{
      display:block;
      background: #fff;
      padding: 15px 20px 15px 45px;
      margin: 0 0 20px;
      position: relative;
      min-height: 60px;

      /*Font*/
      font-family: Georgia, serif;
      font-size: 16px;
      line-height: 1.2;
      color: #666;
      text-align: justify;

      /*Borders - (Optional)*/
      border-left: 15px solid #c76c0c;
      border-right: 2px solid #c76c0c;

      /*Box Shadow - (Optional)*/
      -moz-box-shadow: 2px 2px 15px #ccc;
      -webkit-box-shadow: 2px 2px 15px #ccc;
      box-shadow: 2px 2px 15px #ccc;
    }
    .cdx-quote__text::before{
      content: "\201C"; /*Unicode for Left Double Quote*/

      /*Font*/
      font-family: Georgia, serif;
      font-size: 50px;
      font-weight: bold;
      color: #999;

      /*Positioning*/
      position: absolute !important;
      left: 10px;
      top:5px;
    }

    .cdx-quote__text::after{
      /*Reset to make sure*/
      content: "";
    }

    .cdx-quote__caption {
      border: 0px;
      box-shadow: 0 0 black;
    }

    .image-tool__caption {
      color: dimgray;
      font-style: italic;
      border: 0px;
      box-shadow: 0 0 black;
    }

    .hljs {
      color: #a9b7c6;
      background: #282b2e;
      display: block;
      overflow-x: auto;
      padding: 50px 5px 5px 5px;
    }

    #btn-highlight {
      float: right;
      margin-right: 25px;
      font-size: 15px;
    }

  }
  .comments {
    .utterances {
      max-width: 100% !important;
    }
  }
</style>

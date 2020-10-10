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
                <v-col cols="12" sm="4"> 종류 : {{article.category}} </v-col>
                <v-col cols="12" sm="8"> 태그 : {{article.tags.toString()}}</v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

            <div v-if="article" v-html="article.contentHtml" class="conetent-read d-flex justify-center"></div>
            <EditorComponent v-if="false" :content="article.content" />

          <v-card-actions>
            <v-btn text color="primary" @click="moveToList">
              <v-icon left>mdi-format-list-bulleted</v-icon> List
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
          <commentComponent />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { Disqus } from 'vue-disqus'
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
        setTimeout(() => {
          const editableElements = document.querySelectorAll('[contenteditable=true]')
          editableElements.forEach(el => el.removeAttribute('contenteditable'))
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
      min-width: 600px !important;
      max-width: 800px !important;
    }
    .ce-toolbar__content {
      max-width: 800px !important;
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
      padding: 50px 15px 15px 15px;
    }

    #btn-highlight {
      float: right;
      margin-right: 25px;
      font-size: 15px;
    }

    /*

    code-editor https://codepen.io/rrenula/pen/qmaFb
    .code-editor:before,
    .code-editor:after,
    .code-editor span.control:before,
    .code-editor span.after:after {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -o-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      content: '';
      position: absolute;
      z-index: 1;
      -webkit-transition: all .5s ease-in-out;
      -moz-transition: wall .5s ease-in-out;
      -o-transition: all .5s ease-in-out;
      transition: all .5s ease-in-out;
    }

    .code-editor {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -o-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      margin: 40px auto 0 auto;
      width: 750px;
      text-align: left;
      background-color: #473431;
      border-radius: 0 0 5px 5px;
      overflow: auto;
      -webkit-transition: all .5s ease-in-out;
      -moz-transition: wall .5s ease-in-out;
      -o-transition: all .5s ease-in-out;
      transition: all .5s ease-in-out;
    }

    .code-editor:before {
      content: 'Sample Code';
      font-family: 'Consolas';
      color: #222;
      padding-top: 6px;
      text-align: center;
      top: 25px;
      width: 750px;
      height: 30px;
      background-color: #cccccc;
      border-radius: 5px 5px 0 0;
      -moz-border-radius: 5px 5px 0 0;
      -o-border-radius: 5px 5px 0 0;
      -webkit-border-radius: 5px 5px 0 0;
    }

    .code-editor span.control:before {
      content: '';
      top: 34px;
      z-index: 2;
      padding: 6px;
      border-radius: 20px;
      -moz-border-radius: 20px;
      -o-border-radius: 20px;
      -webkit-border-radius: 20px;
    }

    .code-editor span.control:nth-child(1):before {
      margin-left: 15px;
      background-color: #df6963;
    }

    .code-editor span.control:nth-child(2):before {
      margin-left: 35px;
      background-color: #f5e18a;
    }

    .code-editor span.control:nth-child(3):before {
      margin-left: 55px;
      background-color: #97c38a;
    }
    */
  }
  .comments {
    .utterances {
      max-width: 100% !important;
    }
  }
</style>

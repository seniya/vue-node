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
            <viewer
              ref="viewer"
              :initialValue="article.content"
              @load="onEditorLoad"
            ></viewer>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="primary" @click="moveList">
              <v-icon left>mdi-list-status</v-icon> List
            </v-btn>
            sss
            <v-spacer></v-spacer>

            <dialogConfirm v-on="{ click: alertMsg }">
              <!-- <template v-slot:activator="dailog">
                <v-btn text color="primary" @click="removeArticle(article._id)">
                  <v-icon left>mdi-trash-can</v-icon> Delete
                </v-btn>
              </template> -->
              <!-- -->
              <template slot="activator" slot-scope="{ on }">
                <v-btn
                  v-on="on"
                  text
                  color="primary"
                  @click="removeArticle(article._id)"
                >
                  <v-icon left>mdi-trash-can</v-icon> Delete
                </v-btn>
              </template>
            </dialogConfirm>
          </v-card-actions>

          <v-spacer class="mb-10" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="comments">
          <Disqus shortname="shortname" @new-comment="newComment" />
          sss
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dialogConfirm from '@/components/dialogConfirm.vue'
import { Disqus } from 'vue-disqus'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import hljs from 'highlight.js'

export default {
  components: {
    dialogConfirm,
    Disqus
  },
  data () {
    return {
      boardName: this.$route.params.name,
      articleId: this.$route.params.articleid,
      article: null,
      dailog: false,
      options: {
        language: 'ko',
        // initialEditType: 'markdown',
        // plugins: [[codeSyntaxHighlight, { hljs }], pluginColorSyntax],
        plugins: [[codeSyntaxHighlight, { hljs }]],
        hooks: {
          addImageBlobHook: this.addImageBlobHook
        }
      }
    }
  },
  mounted () {
    this.readArticle(this.articleId)
  },
  methods: {
    alertMsg () {
      alert('dddd')
    },
    newComment ({ id, text }) {
      console.log('newComment id, text', id, text)
    },
    async readArticle (id) {
      try {
        const data = await this.$store.dispatch('article/ARTICLE_READ', { id })
        this.prepareData(data)
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async removeArticle (id) {
      try {
        const data = await this.$store.dispatch('article/ARTICLE_REMOVE', {
          id
        })
        if (data.success) {
          this.$toast.success('삭제되었습니다.')
          this.moveList()
        } else {
          throw new Error(data.msg)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    onEditorLoad (v) {
      const el = v.preview.el
      console.log('onEditorLoad el : ', el)
    },
    moveList () {
      this.$router.push(`/board/${this.boardName}`)
    },
    prepareData (data) {
      const nData = this.$_.cloneDeep(data)
      const { content } = nData.body
      console.log('prepareData content: ', content)
      const findVal1 = '```js'
      const findVal2 = '```'

      const startVal = content.indexOf(findVal1)
      console.log('startVal : ', startVal)

      // const nextContent = content.indexOf(findVal1, startVal)
      // console.log('nextContent : ', nextContent)

      const endVal = content.indexOf(findVal2, startVal + 1)
      console.log('endVal : ', endVal)

      const resultVal = content.substr(startVal + 7, endVal - 10)
      // console.log('resultVal : ', resultVal)

      hljs.registerLanguage('javascript', javascript)
      const convertVal = hljs.highlight('javascript', resultVal)
      console.log('convertVal : ', convertVal)

      const convertValComplete = `<pre><code class="javascript hljs">${convertVal.value}</code></pre>`
      console.log('convertValComplete : ', convertValComplete)

      nData.body.content = convertValComplete

      this.article = nData.body
    }
  }
}
</script>

<style>
</style>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Edit Article</v-card-title>

          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="4" v-if="board && article">
                  <v-combobox
                    v-model="form.category"
                    :items="board.categories"
                    label="종류"
                    outlined
                    hide-details
                  />
                </v-col>
                <v-col cols="12" sm="8" v-if="board && article">
                  <v-combobox
                    v-model="form.tags"
                    :items="board.tags"
                    label="태그"
                    multiple
                    outlined
                    small-chips
                    hide-details
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-if="board && article"
                    v-model="form.title"
                    outlined
                    label="제목"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-if="board && article"
                    v-model="form.subTitle"
                    outlined
                    label="소제목"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider class="ma-4"></v-divider>

          <v-card-text>
            <EditorComponent
              ref="editor"
              v-if="article"
              :content="article.content"
              :onEditorReady="editorReady"
              :onAddImageBlobHook= "editorAddImageBlobHook"
              :onAddImageHook= "editorAddImageHook"
            />
          </v-card-text>
          <!--
           <v-card-text>
            <input id="bin" type="file">
            <v-btn @click="upload">전송</v-btn>
          </v-card-text> -->

          <v-card-actions>
            <v-btn text color="primary" @click="moveToBack">
              <v-icon left>mdi-backspace-outline</v-icon> Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="saveData">
              <v-icon left>mdi-content-save</v-icon> Save
            </v-btn>
          </v-card-actions>

          <v-spacer class="mb-10" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditorComponent from '@/views/board/component/editorComponent.vue'

export default {
  components: {
    EditorComponent
  },
  data () {
    return {
      boardName: this.$route.params.name,
      articleId: this.$route.params.articleid,
      board: null,
      article: null,

      form: {
        title: '',
        subTitle: '',
        content: '',
        contentHtml: '',
        category: '',
        tags: ''
      },
      files: [],
      editor: null
    }
  },
  mounted () {
    this.readBoard()
    this.readArticle()
  },
  methods: {
    editorReady (_editor) {
      this.editor = _editor
      // console.log('Editor.js is ready to work! : ', this.editor)
    },
    saveData () {
      const renderHtml = document.getElementById('editorjs')
      this.editor.save().then((savedData) => {
        this.form.content = JSON.stringify(savedData)
        this.form.contentHtml = renderHtml.innerHTML
        this.updateArticle()
      })
    },
    async readBoard () {
      try {
        const data = await this.$store.dispatch('board/BOARD_INFO', {
          id: this.$route.params.name
        })
        if (!data.success) throw new Error(data.msg)
        this.board = data.body
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async readArticle () {
      try {
        const data = await this.$store.dispatch('article/ARTICLE_READ', { id: this.articleId })
        setTimeout(() => {
          const article = data.body
          this.article = article
          this.form.category = article.category
          this.form.tags = article.tags
          this.form.title = article.title
          this.form.subTitle = article.subTitle
        }, 0)
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async updateArticle () {
      if (!this.form.title) return this.$toast.error('제목을 입력하세요')
      if (!this.form.subTitle) return this.$toast.error('소제목을 입력하세요')
      if (!this.form.content) return this.$toast.error('내용을 입력하세요')
      try {
        const data = await this.$store.dispatch('article/ARTICLE_UPDATE', {
          id: this.articleId,
          fdata: this.form
        })
        if (data.success) {
          this.$toast.success('수정 되었습니다.')
          this.moveToBack()
        } else {
          throw new Error(data.msg)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async imageUpload (file) {
      const fdata = new FormData()
      fdata.append('title', 'editor_upload')
      fdata.append('readAll', true)
      fdata.append('file', file)
      try {
        const data = await this.$store.dispatch('file/FILE_UPLOAD_DEFAULT', {
          fdata
        })
        if (!data.success) throw new Error(data.msg)
        const image = data.body
        image.url = data.body.url
        this.files.push(file)
        return image
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async editorAddImageBlobHook (file) {
      const ufile = await this.imageUpload(file)
      const returnValue = {
        success: 1,
        file: { url: ufile.url }
      }
      return new Promise((resolve, reject) => {
        resolve(returnValue)
      })
    },
    editorAddImageHook (url) {
      const returnValue = {
        success: 1,
        file: { url }
      }
      return new Promise((resolve, reject) => {
        resolve(returnValue)
      })
    },
    moveToBack () {
      this.$router.push(`/board/${this.board.name}/${this.articleId}`)
    }
  }
}
</script>

<style>
</style>

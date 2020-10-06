<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>

          <v-card-title>New Article</v-card-title>

          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="4" v-if="board" >
                  <v-combobox
                    v-model="form.category"
                    :items="board.categories"
                    label="종류"
                    outlined hide-details />
                </v-col>
                <v-col cols="12" sm="8" v-if="board" >
                  <v-combobox
                    v-model="form.tags"
                    :items="board.tags"
                    label="태그"
                    multiple
                    outlined small-chips hide-details />
                </v-col>
                <v-col cols="12" >
                  <v-text-field v-model="form.title" outlined label="제목" hide-details></v-text-field>
                </v-col>
                <v-col cols="12" >
                  <v-text-field v-model="form.subTitle" outlined label="소제목" hide-details></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <!-- <v-card-text>
            <editor
              ref="editor" initialEditType="wysiwyg" height="500px" width="100%"
              :options="options"
              ></editor>
          </v-card-text> -->

          <v-card-text>
            <editorTiptap :description="form.content" :menubar="true" :readOnly="false" />
          </v-card-text>

          <!-- <v-card-text>
            <input id="bin" type="file">
            <v-btn @click="upload">전송</v-btn>
          </v-card-text> -->

          <v-card-actions>
            <v-btn text color="primary" @click="moveList">
              <v-icon left>mdi-list-status</v-icon> List
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="addArticle">
              <v-icon left>mdi-content-save</v-icon> Save
            </v-btn>
          </v-card-actions>

          <v-spacer class="mb-10"/>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import editorTiptap from '@/components/editorTiptap.vue'

export default {
  components: {
    editorTiptap
  },
  data () {
    return {
      board: null,
      form: {
        title: '',
        subTitle: '',
        content: '',
        category: '',
        tags: ''
      },
      files: [],
      options: {
        language: 'ko',
        // plugins: [[codeSyntaxHighlight, { hljs }], pluginColorSyntax],
        hooks: {
          addImageBlobHook: this.addImageBlobHook
        }
      }
    }
  },
  mounted () {
    this.getBoard()
  },
  methods: {
    async getBoard () {
      try {
        const data = await this.$store.dispatch('board/BOARD_INFO', { id: this.$route.params.name })
        if (!data.success) throw new Error(data.msg)
        this.board = data.body
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async addArticle () {
      this.form.content = this.$refs.editor.invoke('getHtml')
      if (!this.form.title) return this.$toast.error('제목을 입력하세요')
      if (!this.form.subTitle) return this.$toast.error('소제목을 입력하세요')
      if (!this.form.content) return this.$toast.error('내용을 입력하세요')
      try {
        const data = await this.$store.dispatch('article/ARTICLE_ADD', { id: this.board._id, fdata: this.form })
        if (data.success) {
          this.$toast.success('작성되었습니다.')
          this.moveList()
        } else {
          throw new Error(data.msg)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    moveList () {
      this.$router.push(`/board/${this.board.name}`)
    },
    async imageUpload (file) {
      const fdata = new FormData()
      fdata.append('title', 'editor_upload')
      fdata.append('readAll', true)
      fdata.append('bin', file)
      try {
        const data = await this.$store.dispatch('file/FILE_UPLOAD_DEFAULT', { fdata })
        if (!data.success) throw new Error(data.msg)
        const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/api'
        const image = data.body
        image.url = `${apiRootPath}/download/${data.body._id}`
        this.files.push(file)
        return image
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    addImageBlobHook (blob, callback) {
      this.imageUpload(blob)
        .then(image => {
          callback(image.url, 'img')
        })
        .catch(console.error)
    },
    // TEST
    async upload () {
      const fdata = new FormData()
      // fdata.append('user_id', 'user_id1234')
      fdata.append('bin', document.getElementById('bin').files[0])

      try {
        const data = await this.$store.dispatch('file/FILE_UPLOAD_DEFAULT', { fdata })
        if (!data.success) throw new Error(data.msg)
        this.$toast.success(data.body)
      } catch (error) {
        this.$toast.error(error.message)
      }
    }
  }

}
</script>

<style>

</style>

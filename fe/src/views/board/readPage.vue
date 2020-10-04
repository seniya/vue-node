<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="article">

          <v-card-title>{{article.title}}</v-card-title>
          <v-card-title>{{article.subTitle}}</v-card-title>

          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="4" >
                  종류
                </v-col>
                <v-col cols="12" sm="8" >
                  태그
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <viewer ref="viewer" :initialValue="article.content" @load="onEditorLoad"></viewer>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="primary" @click="moveList">
              <v-icon left>mdi-list-status</v-icon> List
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="removeArticle(article.id)">
              <v-icon left>mdi-trash-can</v-icon> Delete
            </v-btn>
          </v-card-actions>

          <v-spacer class="mb-10"/>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      boardName: this.$route.params.name,
      articleId: this.$route.params.articleid,
      article: null
    }
  },
  mounted () {
    this.readArticle(this.articleId)
  },
  methods: {
    async readArticle (id) {
      const data = await this.$store.dispatch('article/ARTICLE_READ', { id })
      this.article = data.body
    },
    async removeArticle (id) {
      const data = await this.$store.dispatch('article/ARTICLE_REMOVE', { id })
      this.article = data.body
    },
    onEditorLoad (v) {
      const el = v.preview.el
      console.log('onEditorLoad el : ', el)
    },
    moveList () {
      this.$router.push(`/board/${this.boardName}`)
    }
  }

}
</script>

<style>

</style>

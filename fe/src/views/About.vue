<template>
  <v-container>
    <v-row>
      <v-col>
        <v-textarea outlined v-model="text"></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      text: 'debug'
    }
  },
  mounted () {
    const a = {
      a: 1,
      b: 2
    }
    // this.text = JSON.stringify(this.$vuetify.breakpoint)
    console.log('page start a: ', a)
    console.log('page start this.$vuetify.breakpoint: ', this.$vuetify.breakpoint)
  }
}
</script>

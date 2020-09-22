<template>
  <div class="about">
    <h1>Help</h1>
    <h3>{{ title }}</h3>
    <v-btn :color="btnColor" @click="click">test</v-btn>
    <p></p>
    <v-chip v-for="(chip, i) in chips" :color="chip.cl" :key="i">{{ chip.name }}</v-chip>

    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col
          v-for="n in 4"
          :key="n"
          cols="12"
          sm="12"
          md="6"
          lg="3"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            One of three columns
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'xxxx',
      btnColor: 'success',
      chips: [
        {
          cl: 'red',
          name: 'abc'
        },
        {
          cl: 'blue',
          name: 'dddd'
        }
      ]
    }
  },
  methods: {
    click () {
      this.title = 'bbbbbbbbbb'
      this.btnColor = 'warning'
    }
  }
}
</script>

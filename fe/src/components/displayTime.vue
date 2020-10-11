<template>
  <v-tooltip bottom>
    <template v-slot:activator="{on}">
      <span v-on="on">{{displayTime}}</span>
    </template>
    <span>{{defaultTime}}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ['time', 'type'],
  computed: {
    displayTime () {
      if (this.type === 'normal') {
        return this.$moment(this.time).format('MM-DD HH:mm:ss')
      } else {
        const bt = this.$moment(this.time)
        const ct = this.$moment()
        const diff = ct.diff(bt, 'days')
        if (diff > 0) return bt.toDate().toLocaleDateString()
        return bt.fromNow()
      }
    },
    defaultTime () {
      return this.$moment(this.time).format('YYYY MMMM Do, HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

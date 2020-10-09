<template>

    <v-dialog
      v-model="show"
      persistent
      max-width="290"
      v-bind:class="confirmShowClass"
    >
      <v-card>
        <v-card-title class="headline">
          {{ object.title }}
        </v-card-title>
        <v-card-text>{{ object.text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            v-if="object.type == 2"
            @click="cancleAlert"
          >
            {{ cancleBtnText }}
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmAlert"
          >
            {{ confirmBtnText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    confirmShowClass () {
      return {
        show: !!this.show
      }
    },
    cancleBtnText () {
      if (!this.object.cancleBtnText || this.object.cancleBtnText === '') {
        return '취소'
      }
      return this.object.cancleBtnText
    },
    confirmBtnText () {
      if (!this.object.confirmBtnText || this.object.confirmBtnText === '') {
        return '확인'
      }
      return this.object.confirmBtnText
    }
  },
  methods: {
    async cancleAlert () {
      if (this.object.cancleEvent) {
        await this.object.cancleEvent()
      }
      this.$emit('close-alert')
    },
    async confirmAlert () {
      if (this.object.confirmEvent) {
        await this.object.confirmEvent()
      }
      this.$emit('close-alert')
    }
  }
}
</script>

<style></style>

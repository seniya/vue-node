<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="item in items" :key="item._id" cols="12" sm="6" md="4" lg="3">
        <board-card :board="item" @list="list"></board-card>
      </v-col>
    </v-row>

    <v-alert :value="!items.length" type="warning">
      데이터가 없습니다
    </v-alert>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">게시판 추가</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="게시판 코드"
                  required
                  v-model="form.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="게시판 이름"
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="lvs"
                  label="읽기 권한"
                  required
                  v-model="form.readLv"
                ></v-select>
                <v-select
                  :items="lvs"
                  label="쓰기 권한"
                  required
                  v-model="form.createLv"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="add()">확인</v-btn>
          <v-btn color="red darken-1" text @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn elevation="6" absolute bottom right fab @click="addDialog">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import boardCard from '@/views/manage/components/boardCard.vue'

export default {
  components: { boardCard },
  data () {
    return {
      items: [],
      dialog: false,
      lvs: [0, 1, 2, 3],
      form: {
        name: '',
        title: '',
        readLv: 0,
        createLv: 0
      },
      selected: 0
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    addDialog () {
      this.dialog = true
      this.form = {
        name: '',
        title: '',
        readLv: 0,
        createLv: 0
      }
    },
    async add () {
      if (!this.form.name) return this.pop('이름을 작성해주세요', 'warning')
      try {
        await this.$store.dispatch('manage/BOARD_ADD', this.form)
        this.dialog = false
        this.list()
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async list () {
      try {
        const data = await this.$store.dispatch('manage/BOARD_INFO')
        this.items = data
      } catch (error) {
        this.$toast.error(error.message)
      }
    }
  }
}
</script>

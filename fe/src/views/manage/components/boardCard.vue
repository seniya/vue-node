<template>
  <v-card>
    <template v-if="!edit">
      <v-card-title primary-title>
        <h3>{{board.name}}</h3>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text>
        <div>읽기 권한: {{board.readLv}}</div>
        <div>쓰기 권한: {{board.createLv}}</div>
        <div>설명: {{board.title}}</div>
      </v-card-text>

      <v-divider light></v-divider>
      <v-card-actions>
        <v-btn outlined color="primary" @click="modeChange(board)">수정</v-btn>
        <!-- <v-btn outlined color="error" @click="ca=true">삭제</v-btn> -->
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-title>
        <span class="headline">게시판 수정</span>
      </v-card-title>
      <v-card-text>
        <v-form>
        <v-text-field
          label="게시판 코드"
          required
          v-model="form.name"
        ></v-text-field>

        <v-text-field
          label="게시판 이름"
          required
          v-model="form.title"
        ></v-text-field>

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
      </v-form>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="update(board)">확인</v-btn>
        <v-btn color="error darken-1" text @click.native="edit = false">취소</v-btn>
      </v-card-actions>
    </template>

    <template v-if="ca">
      <v-alert prominent type="warning">
        <v-row align="center">
          <v-col class="grow">
            정말 진행 하시겠습니까?
          </v-col>
          <v-col class="shrink">
            <v-btn class="mb-2" color="error" @click="remove(board)">확인</v-btn>
            <v-btn color="secondary" @click="ca=false">취소</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </template>
  </v-card>
</template>
<script>
export default {
  props: ['board'],
  data () {
    return {
      ca: false,
      lvs: [0, 1, 2, 3],
      form: {
        name: '',
        readLv: 0,
        createLv: 0,
        title: ''
      },
      edit: false
    }
  },
  methods: {
    modeChange (b) {
      this.edit = true
      this.form = {
        name: b.name,
        title: b.title,
        readLv: b.readLv,
        createLv: b.createLv
      }
    },
    async update (board) {
      try {
        const data = await this.$store.dispatch('manage/BOARD_UPDATE', { id: board._id, data: this.form })
        if (!data.success) throw new Error(data.msg)
        this.$toast.success('수정하였습니다.')
        this.$emit('list')
        this.edit = false
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    remove (board) {
      try {
        this.$store.dispatch('manage/BOARD_REMOVE', { id: board._id })
        this.$emit('list')
      } catch (error) {
        this.$toast.error(error.message)
      }
    }
  }
}
</script>

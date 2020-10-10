<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="item in items" :key="item._id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>
            <h3>{{item.name|| 'no-name'}} </h3>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text>
            <div>권한: {{item.lv}}</div>
            <div>진입 횟수: {{item.inCnt}}</div>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn outlined color="primary" @click="openDialog(item)">수정</v-btn>
            <v-btn outlined color="error" @click="remove(item._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert :value="!items.length" type="warning">
      데이터가 없습니다
    </v-alert>

    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title>
          <span class="headline">페이지 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="페이지 이름"
                  hint="게시판"
                  persistent-hint
                  required
                  v-model="pageName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="pageLvs"
                  label="권한"
                  required
                  v-model="pageLv"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="update">수정</v-btn>
          <v-btn color="blue darken-1" text @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>
<script>

export default {
  data () {
    return {
      items: [],
      dialog: false,
      pageLvs: [0, 1, 2, 3],
      pageLv: 0,
      pageName: '',
      putId: ''
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    async list () {
      try {
        const data = await this.$store.dispatch('manage/PAGE_INFO')
        this.items = data
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async update () {
      this.dialog = false
      try {
        const fdata = {
          name: this.pageName,
          lv: this.pageLv
        }
        const data = await this.$store.dispatch('manage/PAGE_UPDATE', { id: this.putId, data: fdata })
        if (!data.success) throw new Error(data.msg)
        this.$toast.success('페이지 수정 완료')
        this.list()
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async remove (id) {
      try {
        await this.$store.dispatch('manage/PAGE_REMOVE', { id })
        this.$toast.success('페이지 삭제 완료')
        this.list()
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    openDialog (page) {
      this.putId = page._id
      this.dialog = true
      this.pageName = page.name
      this.pageLv = page.lv
    }
  }
}
</script>

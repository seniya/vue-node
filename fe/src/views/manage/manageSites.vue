<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="site in items" :key="site._id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>
            <h3>{{site.title|| 'no-name'}} </h3>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text>
            <div>하단: {{site.copyright}}</div>
            <div>색상: {{site.dark}}</div>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn outlined color="primary" @click="openDialog(site)">수정</v-btn>
            <v-btn outlined color="error" @click="remove(site._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert :value="!items.length" type="warning">
      데이터가 없습니다
    </v-alert>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">사이트 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="사이트 이름"
                  hint="아무거나"
                  persistent-hint
                  required
                  v-model="siteTitle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="사이트 하단"
                  hint="아무거나"
                  persistent-hint
                  required
                  v-model="siteCopyright"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-switch
                  label="다크모드"
                  v-model="siteDark"
                ></v-switch>
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
      siteTitle: '',
      siteCopyright: '',
      siteDark: false,
      listType: 'list' || 'card'
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    async list () {
      try {
        const data = await this.$store.dispatch('manage/SITE_INFO')
        console.log('list : ', data)
        this.items = data
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async update () {
      this.dialog = false
      try {
        const fdata = {
          title: this.siteTitle,
          copyright: this.siteCopyright,
          dark: this.siteDark,
          listType: this.listType
        }
        const data = await this.$store.dispatch('manage/SITE_UPDATE', { id: this.putId, data: fdata })
        if (!data.success) throw new Error(data.msg)
        this.$toast.success('설정 저장 완료')
        this.list()
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async remove (id) {
      try {
        await this.$store.dispatch('manage/SITE_REMOVE', { id })
        this.$toast.success('설정 삭제 완료')
        this.list()
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    openDialog (site) {
      this.putId = site._id
      this.dialog = true
      this.siteTitle = site.title
      this.siteCopyright = site.copyright
      this.siteDark = site.dark
    }
  }
}
</script>

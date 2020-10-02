<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>회원 가입</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                v-model="form.id"
                :counter="10"
                label="아이디"
                data-vv-name="id"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.pwd"
                label="비밀번호"
                data-vv-name="pwd"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.name"
                label="이름"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-checkbox
                v-model="agree"
                value="1"
                label="약관동의: 암호화도 안되어 있는 사이트인데 정말 가입하겠습니까?"
                data-vv-name="agree"
                type="checkbox"
                required
              ></v-checkbox>

              <vue-recaptcha
                ref="recaptcha"
                :sitekey="$cfg.recaptchaSiteKey"
                size="invisible"
                @verify="onVerify"
                @expired="onExpired"
              >
              </vue-recaptcha>
              <v-spacer></v-spacer>
              <v-btn @click="checkRobot()">가입</v-btn>
              <v-btn @click="clear">초기화</v-btn>

            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="sb.act">
      {{ sb.msg }}
      <v-btn :color="sb.color" text @click="sb.act = false">
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

export default {
  // $_veeValidate: {
  //   validator: 'new'
  // },
  data () {
    return {
      form: {
        id: '',
        name: '',
        pwd: '',
        response: '' // add
      },
      agree: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: null,
      sb: {
        act: false,
        msg: '',
        color: 'warning'
      }
    }
  },

  mounted () {
    // this.$validator.localize('en', this.dictionary)
  },

  methods: {
    submit () {
      this.$axios.post('/sign/up', this.form)
        .then(r => {
          if (!r.data.success) throw new Error('서버가 거부했습니다.')
          this.pop('가입 완료 되었습니다.', 'success')

          this.$router.push('/sign')
        })
        .catch(e => this.pop(e.message, 'warning'))
    },
    clear () {
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      // this.$validator.reset()
    },
    pop (m, cl) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = cl
    },
    onVerify (r) {
      this.form.response = r
      this.$refs.recaptcha.reset()
      this.submit()
    },
    onExpired () {
      this.form.response = ''
      this.$refs.recaptcha.reset()
    },
    checkRobot () {
      if (this.form.response) this.submit()
      else this.$refs.recaptcha.execute()
    }
  }
}
</script>

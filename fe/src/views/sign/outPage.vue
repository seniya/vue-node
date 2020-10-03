<template>
  <v-app>
    <div class="out-page">
      <div class="teacup">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="plate"></div>
      </div>
    </div>

  </v-app>
</template>

<script>
export default {
  mounted () {
    this.removeToken()
  },
  methods: {
    removeToken () {
      this.$store.dispatch('auth/SIGN_OUT')
      setTimeout(() => {
        this.$router.push('/')
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>

.out-page {
  margin: 0;
  padding: 0;
  background: #3a0000;
  min-height: 100vh;

  .teacup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 160px;
    background: #fff;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;

    .plate {
      position: absolute;
      top: 161px;
      width: 250px;
      height: 30px;
      transform: translateX(-50px);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background: #fff;
    }

    ul {
      margin: 0;
      padding: 0;
      position: absolute;
      top: -50%;
      transform: translateX(10%);
      width: 100%;
    }

    ul li {
      list-style: none;
      width: 2px;
      height: 70px;
      background: #fff;
      float: left;
      margin: 10px;
      animation: animate 2s linear infinite;
    }

    @keyframes animate {
      0% {
        transform: translateY(0);
        opacity: 1;
        filter: blur(3px);
      }

      100% {
        transform: translateY(-80px);
        opacity: 0;
        filter: blur(5px);
      }
    }

    ul li:nth-child(1) {
      animation-delay: .2s;
    }

    ul li:nth-child(2) {
      animation-delay: .6s;
    }

    ul li:nth-child(3) {
      animation-delay: 1s;
    }

    ul li:nth-child(4) {
      animation-delay: .6s;
    }

    ul li:nth-child(5) {
      animation-delay: .2s;
    }
  }

  .teacup:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 21px;
    width: 100%;
    border-radius: 50%;
    background: #c16d31;
    border: 5px solid #fff;
    box-sizing: border-box;
    transform: translateY(-50%);
    box-shadow: inset 0 0 15px rgba(0, 0, 0, .7);
  }

  .teacup:after {
    content: '';
    position: absolute;
    top: 48%;
    right: -50px;
    height: 90px;
    width: 80px;
    border-radius: 50%;
    background: transparent;
    border: 10px solid #fff;
    box-sizing: border-box;
    transform: translateY(-50%);
  }
}

</style>

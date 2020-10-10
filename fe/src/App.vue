<template>
  <div>
    <transition name="page">
      <!--
      <router-view></router-view>
      <router-view :key="$route.fullPath"></router-view>
      -->
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    routerKey () {
      return `${this.$route.fullPath}_main`
    }
  }
}
</script>

<style lang="scss">

@font-face {
    font-family: 'InfinitySans-RegularA1';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

$body-font-family: 'InfinitySans-RegularA1';

.v-application {
   font-family: $body-font-family, sans-serif !important;
 }
</style>

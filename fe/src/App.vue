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

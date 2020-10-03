<template>
  <div>
    <transition name="page">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

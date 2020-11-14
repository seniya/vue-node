<template>
  <div id="module_sheep">
    <canvas id="module_sheep_convas"></canvas>
  </div>
</template>

<script>
import { App } from '@/views/study/sheep/app'
export default {
  mounted () {
    const newApp = new App()
    console.log(newApp)
  }

}
</script>

<style lang="scss">

/* * {
  outline: 0;
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
} */

.module_sheep {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ffcaec;

  canvas {
    width: 100%;
    height: 100%;
  }
}

</style>

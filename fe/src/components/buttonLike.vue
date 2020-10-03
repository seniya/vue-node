<template>
  <div class="component-btn-like">
    <label class="like">
      <input type="checkbox" v-model="checkbox" @change="changeCheckbox" id="checkbox"/>
      <div class="hearth"/>
    </label>
      <div class="div-text">
        <label for="checkbox">{{text}}</label>
      </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'value'],
  data () {
    return {
      checkbox: this.value,
      text: this.label || ''
    }
  },
  methods: {
    changeCheckbox (e) {
      this.$emit('change', this.checkbox)
    }
  }
}
</script>

<style lang="scss" scoped>

.component-btn-like {

  --size: 50px;
  --frames: 62;
  width: 100%;
  height: var(--size);
  // background-color: #15202B;
  // min-height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // user-select: none;

  .div-text {
    float: left; margin-top:12px;
    label {
      cursor: pointer;
    }
  }

  input {
    display: none;
  }

  .like {
    float: left;
    display: block;
    width: var(--size);
    height: var(--size);
    cursor: pointer;
    border-radius: 999px;
    overflow: visible;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  .hearth {
    background-image: url('~@/assets/Hashflag-AppleEvent.svg');
    background-size: calc(var(--size) * var(--frames)) var(--size);
    background-repeat: no-repeat;
    background-position-x: calc(var(--size) * (var(--frames) * -1 + 2));
    background-position-y: calc(var(--size) * 0.02);
    width: var(--size);
    height: var(--size);
  }

  input:checked + .hearth {
    animation: like 1s steps(calc(var(--frames) - 3));
    animation-fill-mode: forwards;
  }

  @keyframes like {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: calc(var(--size) * (var(--frames) * -1 + 3));
    }
  }

  @media (hover: hover) {
    .like:hover {
      background-color: #E1255E15;
      .hearth {
        background-position-x: calc(var(--size) * (var(--frames) * -1 + 1));
      }
    }
  }

  // hashflag-gallery - dribbble - twitter
  .hashflag {
    position: fixed;
    display: block;
    right: 114px;
    bottom: 20px;
    img {
      display: block;
      height: 28px;
    }
  }
  .dribbble {
    position: fixed;
    display: block;
    right: 20px;
    bottom: 20px;
    img {
      display: block;
      height: 28px;
    }
  }
  .twitter {
    position: fixed;
    display: block;
    right: 64px;
    bottom: 14px;
    svg {
      width: 32px;
      height: 32px;
      fill: #1da1f2;
    }
  }
}

</style>

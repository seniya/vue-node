<template>
  <div class="module-higilight">
    <div class="code-editor">
      <span class="control"></span>
      <span class="control"></span>
      <span class="control"></span>
      <span class="control">javascript</span>

      <pre>
        <code class="language-css">

        </code>
      </pre>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.module-higilight {
  background: #e16a3f;
  height: 600px;
  // padding-top: 100px;

  .code-editor:before,
  .code-editor:after,
  .code-editor span.control:before,
  .code-editor span.after:after {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    content: '';
    position: absolute;
    z-index: 1;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: wall .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
  }

  .code-editor {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 40px auto 0 auto;
    width: 750px;
    text-align: left;
    background-color: #473431;
    border-radius: 0 0 5px 5px;
    overflow: auto;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: wall .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
  }

  .code-editor:before {
    content: 'Code Editor';
    font-family: 'Consolas';
    color: #222;
    padding-top: 6px;
    text-align: center;
    top: 25px;
    width: 750px;
    height: 30px;
    background-color: #cccccc;
    border-radius: 5px 5px 0 0;
    -moz-border-radius: 5px 5px 0 0;
    -o-border-radius: 5px 5px 0 0;
    -webkit-border-radius: 5px 5px 0 0;
  }

  .code-editor span.control:before {
    content: '';
    top: 34px;
    z-index: 2;
    padding: 6px;
    border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;
    -webkit-border-radius: 20px;
  }

  .code-editor span.control:nth-child(1):before {
    margin-left: 15px;
    background-color: #df6963;
  }

  .code-editor span.control:nth-child(2):before {
    margin-left: 35px;
    background-color: #f5e18a;
  }

  .code-editor span.control:nth-child(3):before {
    margin-left: 55px;
    background-color: #97c38a;
  }
}

</style>

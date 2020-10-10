<template>
  <div class="module-higilight">
    <div class="code-editor">
      <span class="control"></span>
      <span class="control"></span>
      <span class="control"></span>
      <pre>
        <code class="language-css">
let fn1 = function() {
  console.log('fn1 실행');
  fn2();
}

let fn2 = function() {
  console.log('fn2 실행');
}

fn1();
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

  // padding-top: 100px;
  padding: 50px;

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
    position: relative;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 40px auto 0 auto;
    width: 100%;
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
    width: 100%;
    height: 30px;
    background-color: #cccccc;
  }

  .code-editor span.control:before {
    content: '';
    top: 10px;
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

<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button class="menubar__button" @click.prevent="showLinkMenu(getMarkAttrs('link'))" :class="{ 'is-active': isActive.link() }">link</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">bold</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">italic</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">strike</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">underline</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">code</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">code_block</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click.prevent="commands.paragraph">paragraph</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">heading1</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">heading2</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">heading3</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">bullet_list</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">ordered_list</button>
        <button class="menubar__button" :class="{ 'is-active': isActive.blockquote() }" @click.prevent="commands.blockquote">blockquote</button>
        <button class="menubar__button" @click="commands.horizontal_rule">horizontal_rule</button>
        <button class="menubar__button" @click.prevent="commands.undo">undo</button>
        <button class="menubar__button" @click.prevent="commands.redo">redo</button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
// Import the basic building blocks
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Blockquote, CodeBlock, HardBreak, Heading, HorizontalRule, OrderedList, BulletList, ListItem, TodoItem, TodoList, Bold, Code, Italic, Link, Strike, Underline, History } from 'tiptap-extensions'

export default {
  components: {
    EditorMenuBar,
    EditorContent
  },
  data () {
    return {
      // Create an `Editor` instance with some default content. The editor is
      // then passed to the `EditorContent` component as a `prop`
      editor: new Editor({
        content: '<p>This is just a boring paragraph</p>',
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Link({ rel: '', target: '_blank' }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(), new TodoItem(), new TodoList(), new Bold(),
          new Code(), new Italic(), new Strike(), new Underline(), new History()
        ]
      })
    }
  },
  beforeDestroy () {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy()
  },
  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href; this.linkMenuIsActive = true
      this.$nextTick(() => { this.$refs.linkInput.focus() })
    },
    hideLinkMenu () {
      this.linkUrl = null; this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url, target: '_blank' }); this.hideLinkMenu()
    }
  }

}
</script>

<style lang="scss" scoped>
$black: 000000;
$white: ffffff;
$theme-color-main: cccccc;
$gray-400: cccccc;

.editor {
  position: relative;  margin: 0 auto 5rem auto;
  // max-width: 30rem;
  .menubar {
    text-align: center; border-bottom: 1px solid #ddd; padding: 0.2rem 0; transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
    &.is-hidden { visibility: hidden; opacity: 0; }
    &.is-focused { visibility: visible; opacity: 1; transition: visibility 0.2s, opacity 0.2s; }
    &__button {
      font-weight: bold; display: inline-flex; background: transparent; border: 0; color: $black; padding: 0.2rem 0.5rem; margin-right: 0.2rem; border-radius: 3px; cursor: pointer;
      // &:hover { background-color: rgba($black, 0.05); }
      // &.is-active { background-color: rgba($black, 0.1); }
    }
    span#{&}__button { font-size: 13.3333px; }
  }
  .editor__content {
    overflow-wrap: break-word; word-wrap: break-word; word-break: break-word;
    .ProseMirror {
      min-height: 10rem; padding: 0.5rem;
      &:focus { outline: none; }
      pre {
        padding: 0.7rem 1rem; border-radius: 5px; background: $black; color: $white; font-size: 0.8rem; overflow-x: auto;
        code { display: block; }
      }
      p code {
        padding: 0.2rem 0.4rem; border-radius: 5px; font-size: 0.8rem; font-weight: bold;
        // background: rgba($black, 0.1); color: rgba($black, 0.8);
      }
      ul,
      ol { padding-left: 1rem; }
      li > p,
      li > ol,
      li > ul {
        margin: 0;
      }
      a:not(.btn) {
        color: $theme-color-main; text-decoration: underline;
      }
      blockquote {
        //border-left: 3px solid rgba($black, 0.1);
        //color: rgba($black, 0.8);
        padding-left: 0.8rem;
        font-style: italic;
        p { margin: 0; }
      }
      img { max-width: 100%; border-radius: 3px; }
      table {
        border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0; overflow: hidden;
        td,
        th {
          min-width: 1em; border: 2px solid $gray-400; padding: 3px 5px; vertical-align: top; box-sizing: border-box; position: relative;
          > * {
            margin-bottom: 0;
          }
        }
        th { font-weight: bold; text-align: left; }
        .selectedCell:after { z-index: 2; position: absolute; content: ""; left: 0; right: 0; top: 0; bottom: 0; background: rgba(200, 200, 255, 0.4); pointer-events: none; }
        .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; z-index: 20; background-color: #adf; pointer-events: none; }
      }
      .tableWrapper { margin: 1em 0; overflow-x: auto; }
      .resize-cursor { cursor: ew-resize; cursor: col-resize; }
    }
  }
}

</style>

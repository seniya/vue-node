<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <v-btn text icon @click.prevent="commands.undo">
          <v-icon>mdi-undo-variant</v-icon>
        </v-btn>
        <v-btn text icon @click.prevent="commands.redo">
          <v-icon>mdi-redo-variant</v-icon>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
          <v-icon>mdi-format-strikethrough</v-icon>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({level: 1})">
          <b> H1 </b>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({level: 2})">
          <b> H2 </b>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({level: 3})">
          <b> H3 </b>
        </v-btn>

        <v-btn text icon :class="{ 'is-active': isActive.blockquote() }" @click.prevent="commands.blockquote">
          <v-icon>mdi-format-quote-close</v-icon>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
        <v-btn text icon :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
          <v-icon>mdi-order-numeric-ascending</v-icon>
        </v-btn>

        <v-btn text icon @click="commands.horizontal_rule">
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <v-btn text icon @click.prevent="showLinkMenu(getMarkAttrs('link'))" :class="{ 'is-active': isActive.link() }">
          <v-icon>mdi-link-variant</v-icon>
        </v-btn>
        <v-btn text icon @click="loadImage(commands.image)">
            <v-icon>mdi-image</v-icon>
        </v-btn>
        <!-- <button class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">code_block</button> -->
        <v-btn text icon :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
          <v-icon>mdi-xml</v-icon>
        </v-btn>

      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor"/>
  </div>
</template>

<script>
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/a11y-dark.css'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Blockquote, CodeBlock, HardBreak, Heading, HorizontalRule, OrderedList, BulletList, ListItem, TodoItem, TodoList, Bold, Code, Italic, Link, Strike, Underline, History, CodeBlockHighlight } from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data () {
    return {
      editor: new Editor({
        content: `Type here...
        `,
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
          new Italic(), new Strike(), new Underline(), new History(),
          new CodeBlockHighlight({
            languages: {
              javascript,
              css
            }
          }),
          new Code()
        ]
      })
    }
  },
  methods: {
    loadImage: function (command) {
      command({ src: 'https://66.media.tumblr.com/dcd3d24b79d78a3ee0f9192246e727f1/tumblr_o00xgqMhPM1qak053o1_400.gif' })
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
<style lang="scss">
$black: black;
$white: white;
$theme-color-main: cccccc;
$gray-400: cccccc;

// .editor {
//   position: relative;  margin: 0 auto 5rem auto;
//   //max-width: 30rem;
//   min-height: 200px;
//   .menubar {
//     text-align: center; border-bottom: 1px solid #ddd; padding: 0.2rem 0; transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
//     &.is-hidden { visibility: hidden; opacity: 0; }
//     &.is-focused { visibility: visible; opacity: 1; transition: visibility 0.2s, opacity 0.2s; }
//     &__button {
//       font-weight: bold; display: inline-flex; background: transparent; border: 0; color: $black; padding: 0.2rem 0.5rem; margin-right: 0.2rem; border-radius: 3px; cursor: pointer;
//       &:hover { background-color: rgba($black, 0.05); }
//       &.is-active { background-color: rgba($black, 0.1); }
//     }
//     span#{&}__button { font-size: 13.3333px; }
//   }
//   .editor__content {
//     overflow-wrap: break-word;
//     word-wrap: break-word;
//     word-break: break-word;
//     .ProseMirror {
//       min-height: 10rem; padding: 0.5rem;
//       &:focus { outline: none; }
//       pre {
//         padding: 0.7rem 1rem; border-radius: 5px; background: $black; color: $white; font-size: 0.8rem; overflow-x: auto;
//         code { display: block; }
//       }
//       p code {
//         padding: 0.2rem 0.4rem; border-radius: 5px; font-size: 0.8rem; font-weight: bold;
//         background: rgba($black, 0.1);
//         color: rgba($black, 0.8);
//       }
//       ul,
//       ol { padding-left: 1rem; }
//       li > p,
//       li > ol,
//       li > ul {
//         margin: 0;
//       }
//       a:not(.btn) {
//         color: $theme-color-main; text-decoration: underline;
//       }
//       blockquote {
//         border-left: 3px solid rgba($black, 0.1);
//         color: rgba($black, 0.8);
//         padding-left: 0.8rem;
//         font-style: italic;
//         p { margin: 0; }
//       }
//       img { max-width: 100%; border-radius: 3px; }
//       table {
//         border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0; overflow: hidden;
//         td,
//         th {
//           min-width: 1em; border: 2px solid $gray-400; padding: 3px 5px; vertical-align: top; box-sizing: border-box; position: relative;
//           > * {
//             margin-bottom: 0;
//           }
//         }
//         th { font-weight: bold; text-align: left; }
//         .selectedCell:after { z-index: 2; position: absolute; content: ""; left: 0; right: 0; top: 0; bottom: 0; background: rgba(200, 200, 255, 0.4); pointer-events: none; }
//         .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; z-index: 20; background-color: #adf; pointer-events: none; }
//       }
//       .tableWrapper { margin: 1em 0; overflow-x: auto; }
//       .resize-cursor { cursor: ew-resize; cursor: col-resize; }
//     }
//   }
// }
</style>

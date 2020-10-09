<template>
  <div id="editorjs"></div>
  <!--<div><pre><code>{{content}}</code></pre></div>-->
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import Underline from '@editorjs/underline'
import Checklist from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import Embed from '@editorjs/embed'
import InlineCode from '@editorjs/inline-code'
import Link from '@editorjs/link'
import Marker from '@editorjs/marker'
import Quote from '@editorjs/quote'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'
import Attaches from '@editorjs/attaches'

import CodeBlock from '@/components/editorPlugin/codeBlock'
import InlineColor from '@/components/editorPlugin/inlineColor'

export default {
  props: {
    content: {
      type: String,
      required: false
    },
    onEditorReady: {
      type: Function,
      required: false
    },
    onEditorChange: {
      type: Function,
      required: false
    },
    onAddImageBlobHook: {
      type: Function,
      required: false
    },
    onAddImageHook: {
      type: Function,
      required: false
    },
    onAddAttachesBlobHook: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      boardName: this.$route.params.name,
      articleId: this.$route.params.articleid,
      article: null,
      editor: null
    }
  },
  mounted () {
    this.initEditor()
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    initEditor () {
      this.editor = new EditorJS({
        autofocus: true,
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          underline: Underline,
          checklist: Checklist,
          delimiter: Delimiter,
          embed: Embed,
          inlineCode: InlineCode,
          marker: Marker,
          quote: Quote,
          table: Table,
          warning: Warning,
          linkTool: {
            class: Link,
            config: {
              endpoint: `${process.env.VUE_APP_API}/link`
            }
          },
          inlineColor: InlineColor,
          codeBlock: {
            class: CodeBlock,
            config: { readOnly: false }
          },
          image: {
            class: ImageTool,
            config: { uploader: { uploadByFile: this.onAddImageBlobHook, uploadByUrl: this.onAddImageHook } }
          },
          attaches: {
            class: Attaches,
            config: { endpoint: `${process.env.VUE_APP_API}/file/attache`, field: 'file' }
          }
        },
        data: JSON.parse(this.content) || {},
        logLevel: 'ERROR',
        onReady: () => { this.onEditorReady(this.editor) }
        // onChange: () => { this.onEditorChange() }
      })
    }
  }
}
</script>

<style>

</style>

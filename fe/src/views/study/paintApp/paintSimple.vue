<template>
  <div class="module-paint-simple">
    <v-container>
      <v-row>
        <v-col>
          <div class="thickness-bar">
            <div class="thickness" :class="classThickness(2)" @click="setLineThickness(2)" ></div>
            <div class="thickness" :class="classThickness(6)" @click="setLineThickness(6)" ></div>
            <div class="thickness" :class="classThickness(12)" @click="setLineThickness(12)" ></div>
            <div class="thickness" :class="classThickness(24)" @click="setLineThickness(24)" ></div>
            <div class="thickness" :class="classThickness(48)" @click="setLineThickness(48)"></div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-card width="700px" class="elevation-12">
            <!-- id="paintContainer" -->
            <v-stage
              ref="paintContainer"
              :config="containerConfig"
              @mousedown="handleDrawStart"
              @touchstart="handleDrawStart"
              @mouseup="handleDrawEnd"
              @mouseleave="handleDrawEnd"
              @touchend="handleDrawEnd"
              @mousemove="handleDrawWork"
              @touchmove="handleDrawWork">
                <v-layer ref="paintLayer"></v-layer>
              </v-stage>
            </v-card>
            <div class="tools-bar">
              <v-btn icon color="primary" :class="tool === 'brush' ? 'active' : ''" @click="actionSetTool('brush')">
                <v-icon>mdi-pen</v-icon>
              </v-btn>
              <v-btn icon color="primary" :class="tool === 'eraser' ? 'active' : ''" @click="actionSetTool('eraser')">
                <v-icon>mdi-eraser</v-icon>
              </v-btn>
              <div class="mb-15"></div>
              <v-btn icon color="cyan" @click="actionClearLayer">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon color="cyan" @click="actionLoad">
                <v-icon>mdi-lan-pending</v-icon>
              </v-btn>
              <v-btn icon color="cyan" @click="actionSave">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="color-bar">
            <div class="color" :class="classColor('#9b59b6')" @click="setLineColor('#9b59b6')"></div>
            <div class="color" :class="classColor('#3498db')" @click="setLineColor('#3498db')"></div>
            <div class="color" :class="classColor('#2ecc71')" @click="setLineColor('#2ecc71')"></div>
            <div class="color" :class="classColor('#1abc9c')" @click="setLineColor('#1abc9c')"></div>
            <div class="color" :class="classColor('#f1c40f')" @click="setLineColor('#f1c40f')"></div>
            <div class="color" :class="classColor('#e67e22')" @click="setLineColor('#e67e22')"></div>
            <div class="color" :class="classColor('#E73C61')" @click="setLineColor('#E73C61')"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!--
    <pre>
      <code>
{{lastLine}}
      </code>
    </pre>
    -->
  </div>
</template>

<script>
import Konva from 'konva'
import { instance } from '@/api/instance'

function apiSaveDrawing (fdata) {
  return instance({
    method: 'POST',
    url: '/study/paint/add',
    data: fdata
  })
}

function apiReadDrawing (fdata) {
  return instance({
    method: 'GET',
    url: '/study/paint/read/paint-simple'
  })
}

// const width = window.innerWidth
// const height = window.innerHeight - 500
const width = 700
const height = 500

export default {
  data () {
    return {
      paintContainer: null,
      paintLayer: null,
      containerConfig: {
        width: width,
        height: height
      },
      lineThickness: 6, // 2, 6, 12 ...
      lineColor: '#1abc9c', // #9b59b6 #3498db #2ecc71 #1abc9c #f1c40f #e67e22 #E73C61
      isPaint: false,
      tool: 'brush', // 'brush' || 'eraser'
      lastLine: null
    }
  },

  mounted () {
    this.paintContainer = this.$refs.paintContainer.getNode()
    this.paintLayer = this.$refs.paintLayer.getNode()
  },

  methods: {
    setLineThickness (thickness) {
      this.lineThickness = thickness
    },
    setLineColor (color) {
      this.lineColor = color
    },
    classThickness (thickness) {
      return thickness === this.lineThickness ? 'active' : ''
    },
    classColor (color) {
      return color === this.lineColor ? 'active' : ''
    },
    actionSetTool (tool) {
      this.tool = tool
    },
    actionClearLayer () {
      this.paintLayer.clear()
      this.paintLayer.destroyChildren()
      this.lastLine = null
    },
    async actionSave () {
      const jsonData = this.paintLayer.toJSON()
      // const drawingString = JSON.stringify(jsonData)
      const drawingString = jsonData
      // console.log('actionSave json : ', json)
      const fdata = {
        category: 'paint-simple',
        data: drawingString
      }
      const { data } = await apiSaveDrawing(fdata)
      if (!data.success) this.$toast.error(data.msg)
      this.$toast.success('저장되었습니다.')
    },
    async actionLoad () {
      const { data } = await apiReadDrawing()
      if (!data.success) this.$toast.error(data.msg)
      const drawingData = JSON.parse(data.body.data)
      drawingData.children.forEach(lineObj => {
        const newLine = new Konva.Line(lineObj)
        this.paintLayer.add(newLine)
      })

      this.paintLayer.batchDraw()
    },
    handleDrawStart () {
      this.isPaint = true
      // console.log('handleDrawStart')
      const pos = this.paintContainer.getPointerPosition()
      this.lastLine = new Konva.Line({
        stroke: this.lineColor,
        strokeWidth: this.lineThickness,
        globalCompositeOperation: this.tool === 'brush' ? 'source-over' : 'destination-out',
        points: [pos.x, pos.y]
      })
      this.paintLayer.add(this.lastLine)
    },
    handleDrawEnd () {
      this.isPaint = false
      this.lastLine = null
      // console.log('handleDrawEnd')
    },
    handleDrawWork () {
      if (!this.isPaint) {
        return
      }
      const pos = this.paintContainer.getPointerPosition()
      const newPoints = this.lastLine.points().concat([pos.x, pos.y])
      this.lastLine.points(newPoints)
      this.paintLayer.batchDraw()
      // console.log('pos : ', pos)
    }
  }
}
</script>

<style lang="scss" scoped>
  .module-paint-simple {
    position: relative;

    $color-dist: 7px;
    $color-size: 25px;
    $color-opacity: .4;

    .thickness-bar{
      text-align: center;

      .thickness{
        width: 40px;
        height: 40px;
        position: relative;
        margin: 0 20px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, .05);
        border-radius: 50%;
        cursor: pointer;
        transition: all .2s;

        &:hover{
          border-color: rgba(0, 0, 0, .2);
        }

        &:after{
          position: absolute;
          top: 50%;
          left: 50%;
          content: "";
          background-color: rgba(0, 0, 0, .2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all .2s;
        }

        &.active{
          border-color: #3498db;

          &:after{
            background-color: #3498db;
          }
        }

        &:nth-child(1){
          &:after{
            width: 5px;
            height: 5px;
          }
        }

        &:nth-child(2){
          &:after{
            width: 10px;
            height: 10px;
          }
        }

        &:nth-child(3){
          &:after{
            width: 15px;
            height: 15px;
          }
        }

        &:nth-child(4){
          &:after{
            width: 20px;
            height: 20px;
          }
        }

        &:nth-child(5){
          &:after{
            width: 25px;
            height: 25px;
          }
        }
      }
    }

    .color-bar{
      text-align: center;

      .color{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 20px;
        cursor: pointer;
        transition: all .5s cubic-bezier(.1, 2, .5, 1);

        &:hover{
          transform: scale(1.2, 1.2);
        }

        &.active{
          transform: scale(1.3, 1.3);
          cursor: default;
        }

        &:nth-child(1){
          background-color: #9b59b6;
          box-shadow: 0 $color-dist $color-size fade-out(#9b59b6, $color-opacity);
        }

        &:nth-child(2){
          background-color: #3498db;
          box-shadow: 0 $color-dist $color-size fade-out(#3498db, $color-opacity);
        }

        &:nth-child(3){
          background-color: #2ecc71;
          box-shadow: 0 $color-dist $color-size fade-out(#2ecc71, $color-opacity);
        }

        &:nth-child(4){
          background-color: #1abc9c;
          box-shadow: 0 $color-dist $color-size fade-out(#1abc9c, $color-opacity);
        }

        &:nth-child(5){
          background-color: #f1c40f;
          box-shadow: 0 $color-dist $color-size fade-out(#f1c40f, $color-opacity);
        }

        &:nth-child(6){
          background-color: #e67e22;
          box-shadow: 0 $color-dist $color-size fade-out(#e67e22, $color-opacity);
        }

        &:nth-child(7){
          background-color: #e73c61;
          box-shadow: 0 $color-dist $color-size fade-out(#e74c3c, $color-opacity);
        }
      }
    }

    .tools-bar{

      position: absolute;
      top: calc(50% - 250px);
      left: calc(50% + 350px);
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 40px;

      .active{
          transform: scale(1.4, 1.4);
          cursor: default;
        }

      .button{
        width: 40px;
        height: 40px;
        position: relative;
        border: 1px solid rgba(0, 0, 0, .05);
        border-radius: 50%;
        cursor: pointer;
        transition: all .2s;
        margin: 20px 0;

        &.button-clear{
          &:before,
          &:after{
            position: absolute;
            content: "";
            background-color: rgba(0, 0, 0, .2);
          }

          &:before{
            width: 10px;
            height: 12px;
            left: 14px;
            top: 16px;
          }

          &:after{
            width: 14px;
            height: 5px;
            left: 12px;
            top: 10px;
          }

          &:hover{
            border-color: rgba(0, 0, 0, .2);
          }
        }
      }
    }

  }
</style>

<template>
  <!-- <div class="d-flex"></div> -->
    <div class="d-flex justify-center mt-5">
      <canvas ref="canvas" width="550" height="450"></canvas>
    </div>

</template>

<script>
import { Ball } from './ball.js'
import { Paddle } from './paddle.js'
import { Info } from './info.js'
import { Brick } from './brick.js'

export default {

  data () {
    return {
      canvas: null,
      ctx: null,
      stageWidth: null,
      stageHeight: null,
      x: null,
      y: null,
      dx: null,
      dy: null,
      ballRadius: null,
      paddleHeight: null,
      paddleWidth: null,
      paddleX: null,
      rightPressed: null,
      leftPressed: null,
      brickRowCount: null,
      brickColumnCount: null,
      brickWidth: null,
      brickHeight: null,
      score: null,
      lives: null,
      ball: null,
      paddle: null,
      info: null,
      brick: null,
      bricks: null
    }
  },

  mounted () {
    this.initialize()
  },

  destroyed () {
    document.removeEventListener('keydown', this.onKeyDownHandler)
    document.removeEventListener('keyup', this.onKeyUpHandler)
    document.removeEventListener('mousemove', this.onMouseMoveHandler)
  },

  methods: {

    initialize () {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      console.log('mounted this.canvas : ', this.canvas)

      this.stageWidth = 470
      this.stageHeight = 400
      this.canvas.width = this.stageWidth
      this.canvas.height = this.stageHeight

      this.x = this.canvas.width / 2
      this.y = this.canvas.height - 30
      this.dx = 2
      this.dy = -2
      this.ballRadius = 10

      this.paddleHeight = 10
      this.paddleWidth = 75
      this.paddleX = (this.canvas.width - this.paddleWidth) / 2

      this.rightPressed = false
      this.leftPressed = false

      document.addEventListener('keydown', this.onKeyDownHandler, false)
      document.addEventListener('keyup', this.onKeyUpHandler, false)
      document.addEventListener('mousemove', this.onMouseMoveHandler, false)

      this.brickRowCount = 3
      this.brickColumnCount = 5
      this.brickWidth = 75
      this.brickHeight = 20

      this.score = 0
      this.lives = 3

      this.ball = new Ball(this.ballRadius)
      this.paddle = new Paddle(this.canvas, this.paddleWidth, this.paddleHeight)
      this.info = new Info(this.canvas)
      this.brick = new Brick(this.brickRowCount, this.brickColumnCount, this.brickWidth, this.brickHeight)
      this.bricks = this.brick.getBricks()

      this.draw()
    },

    draw () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.brick.drawBricks(this.ctx)
      this.ball.drawBall(this.ctx, this.x, this.y)
      this.paddle.drawPaddle(this.ctx, this.paddleX)
      this.info.drawInfo(this.ctx, this.score, this.lives)
      this.collisionDetection()

      if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
        this.dx = -this.dx
      }
      if (this.y + this.dy < this.ballRadius) {
        this.dy = -this.dy
      } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
        if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
          this.dy = -this.dy
        } else {
          this.lives--
          if (this.lives <= 0) {
          // alert("GAME OVER")
            document.location.reload()
          } else {
            this.x = this.canvas.width / 2
            this.y = this.canvas.height - 30
            this.dx = 2
            this.dy = -2
            this.paddleX = (this.canvas.width - this.paddleWidth) / 2
          }
        }
      }

      if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
        this.paddleX += 7
      } else if (this.leftPressed && this.paddleX > 0) {
        this.paddleX -= 7
      }

      this.x += this.dx
      this.y += this.dy

      requestAnimationFrame(this.draw)
    },

    collisionDetection () {
      for (let i = 0; i < this.brickColumnCount; i++) {
        for (let j = 0; j < this.brickRowCount; j++) {
          const b = this.bricks[i][j]

          /*
        공의 x 좌표는 벽돌의 x 좌표보다 커야 한다.
        공의 x 좌표는 벽돌의 x 좌표 + 가로 길이보다 작아야 한다.
        공의 y 좌표는 벽돌의 y 좌표보다 커야 한다.
        공의 y 좌표는 벽돌의 y 좌표 + 높이보다 작아야 한다.
        */
          if (b.status === 1) {
            if (this.x > b.x &&
            this.x < b.x + this.brickWidth &&
            this.y > b.y && this.y <
            b.y + this.brickHeight) {
              this.dy = -this.dy
              b.status = 0
              this.score++
              if (this.score === this.brickRowCount * this.brickColumnCount) {
              // alert('YOU WIN !!')
                document.location.reload()
              }
            }
          }
        }
      }
    },

    onKeyDownHandler (e) {
      if (e.keyCode === 39) {
        this.rightPressed = true
      } else if (e.keyCode === 37) {
        this.leftPressed = true
      }
    },

    onKeyUpHandler (e) {
      if (e.keyCode === 39) {
        this.rightPressed = false
      } else if (e.keyCode === 37) {
        this.leftPressed = false
      }
    },

    onMouseMoveHandler (e) {
      const relativeX = e.clientX - this.canvas.offsetLeft
      if (relativeX > 0 && relativeX < this.canvas.width) {
        this.paddleX = relativeX - this.paddleWidth / 2
      }
    }
  }

}
</script>

<style>
canvas {
  border: 1px solid #cccccc;
}
</style>

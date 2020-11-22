export class Brick {
  constructor (brickRowCount, brickColumnCount, brickWidth, brickHeight) {
    this.brickRowCount = brickRowCount
    this.brickColumnCount = brickColumnCount
    this.brickWidth = brickWidth
    this.brickHeight = brickHeight
    this.brickPadding = 10
    this.brickOffsetTop = 30
    this.brickOffsetLeft = 20

    this.bricks = []
    for (let i = 0; i < this.brickColumnCount; i++) {
      this.bricks[i] = []
      for (let j = 0; j < this.brickRowCount; j++) {
        this.bricks[i][j] = { x: 0, y: 0, status: 1 }
      }
    }
  }

  getBricks () {
    return this.bricks
  }

  drawBricks (ctx) {
    for (let i = 0; i < this.brickColumnCount; i++) {
      for (let j = 0; j < this.brickRowCount; j++) {
        if (this.bricks[i][j].status === 1) {
          const brickX = (i * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft
          const brickY = (j * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop

          this.bricks[i][j].x = brickX
          this.bricks[i][j].y = brickY

          ctx.beginPath()
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight)
          ctx.fillStyle = '#0095dd'
          ctx.fill()
          ctx.closePath()
        }
      }
    }
  }
}

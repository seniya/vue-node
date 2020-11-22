export class Paddle {
  constructor (canvas, paddleWidth, paddleHeight) {
    this.canvas = canvas
    this.paddleWidth = paddleWidth
    this.paddleHeight = paddleHeight
  }

  drawPaddle (ctx, paddleX) {
    // console.log('drawPaddle this.paddleX : ', this.paddleX)
    ctx.beginPath()
    ctx.rect(paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight)
    // this.ctx.rect(150, 150, 100, 50)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
  }
}

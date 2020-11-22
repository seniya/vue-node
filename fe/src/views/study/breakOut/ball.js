export class Ball {
  constructor (ballRadius) {
    this.ballRadius = ballRadius
    this.color = '#0095DD'
  }

  drawBall (ctx, x, y) {
    ctx.beginPath()
    ctx.arc(x, y, this.ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

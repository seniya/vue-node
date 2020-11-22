export class Info {
  constructor (canvas) {
    this.canvas = canvas
  }

  drawInfo (ctx, score, lives) {
    ctx.font = '16px Arial'
    ctx.fillStyle = '#0095dd'
    ctx.fillText('Score: ' + score, 8, 20)
    ctx.fillText('Lives: ' + lives, this.canvas.width - 65, 20)
  }
}

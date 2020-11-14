import { Hill } from './hill.js'
import { SheepController } from './sheep-controller.js'
import { Sun } from './sun.js'

export class App {
  constructor () {
    // this.canvas = document.createElement('canvas')
    // this.ctx = this.canvas.getContext('2d')
    // document.body.appendChild(this.canvas)

    this.canvas = document.getElementById('module_sheep_convas')
    this.ctx = this.canvas.getContext('2d')

    this.sun = new Sun()
    this.hills = [
      new Hill('#fd6bea', 0.2, 12),
      new Hill('#ff59c2', 0.5, 8),
      new Hill('#ff4674', 1.4, 6)
    ]

    this.sheepController = new SheepController()

    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    requestAnimationFrame(this.animate.bind(this))
  }

  resize () {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight - 48

    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
    // this.ctx.scale(2, 2) // 레티나 디스플레이용

    this.sun.resize(this.stageWidth, this.stageHeight)

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight)
    }

    this.sheepController.resize(this.stageWidth, this.stageHeight)
  }

  animate (t) {
    requestAnimationFrame(this.animate.bind(this))

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    this.sun.draw(this.ctx, t)

    let dots
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx)
      // console.log('hills draw : ', dots)
    }

    this.sheepController.draw(this.ctx, t, dots)
  }
}

class Platform {
    constructor(ctx, canvasHeight, posX, posY, width, height) {
        this.ctx = ctx
        this.canvasHeight = canvasHeight
        this.posX = posX
        this.posY = canvasHeight - posY
        this.width = width
        this.height = height
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.35)'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}
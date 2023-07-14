class Platform {
    constructor(ctx, canvasHeight, posX, posY, width, height, isFloor) {
        this.ctx = ctx
        this.canvasHeight = canvasHeight
        this.posX = posX
        this.posY = canvasHeight - posY
        this.width = width
        this.height = height

        this.isFloor = isFloor
        this.image = new Image()
        this.image.src = './assets/images/platform.png'
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        // this.ctx.fillStyle = this.ctx.createPattern(this.image, 'repeat')
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}
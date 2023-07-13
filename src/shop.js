class Shop {
    constructor(ctx, canvasHeight, posX) {
        this.ctx = ctx
        this.canvasHeight = canvasHeight

        this.posX = posX
        this.posY = this.canvasHeight - 325

        this.image = new Image()
        this.image.src = "./assets/images/shop.png"

        this.sX = 0
        this.sY = 0
        this.sWidth = 118
        this.sHeight = 100
        this.width = (this.image.width / 6) * 1.5
        this.height = this.image.height * 1.5
    }

    draw() {
        this.ctx.drawImage(this.image, this.sX, this.sY, this.sWidth, this.sHeight, this.posX, this.posY, this.width, this.height)
    }

    update() {
        this.draw()
    }
}
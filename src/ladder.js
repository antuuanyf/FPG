class Ladder {
    constructor(ctx, canvasHeight, posX, posY, height) {
        this.ctx = ctx
        this.canvasHeight = canvasHeight
        this.posX = posX
        this.posY = posY
        this.height = height
        this.width = 30

        this.image = new Image()
        this.image.src = './assets/images/ladder.jpg'
    }

    draw() {
        // this.ctx.fillStyle = "brown"
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

}
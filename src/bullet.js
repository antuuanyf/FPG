class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, playerShootDirection) {
        this.ctx = ctx
        this.width = 50
        this.height = 10
        this.direction = playerShootDirection

        if (this.direction === 'left') {
            this.posX = playerPosX - this.width
        } else if (this.direction === 'right') {
            this.posX = playerPosX + playerWidth
        }

        // this.posX = playerPosX + playerWidth
        this.posY = playerPosY + playerHeight / 2
    }

    update() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }

    move() {
        if (this.direction === 'left') this.posX -= 20
        if (this.direction === 'right') this.posX += 20
    }
}
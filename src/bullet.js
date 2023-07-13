class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, playerShootDirection) {
        this.ctx = ctx
        this.width = 7
        this.height = 3
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
        this.ctx.fillStyle = "yellow"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }

    move() {
        if (this.direction === 'left') this.posX -= 20
        if (this.direction === 'right') this.posX += 20
    }
}
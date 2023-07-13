class Enemy extends Player {
    constructor(ctx, canvasHeight, canvasWidth, posX) {
        super(ctx, canvasHeight, canvasWidth, posX)

        this.enemyBullets = []
    }

    draw() {
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }

    setEventListeners() {
        document.addEventListener("keydown", (event) => {
            const key = event.key
            if (key === "ArrowLeft") {
                this.canMoveLeft = true
                this.shootDirection = 'left'
            }
            if (key === "ArrowRight") {
                this.canMoveRight = true
                this.shootDirection = 'right'
            }
            if (key === "ArrowUp" && this.canJump) {
                this.velY -= this.isInLadder ? 5 : 15
                this.canJump = false
            }
            if (key === "ArrowDown" && this.canShoot && this.shootDirection === 'left') {
                this.enemyBullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height, this.shootDirection))
                this.canShoot = false
            }
            if (key === "ArrowDown" && this.canShoot && this.shootDirection === 'right') {
                this.enemyBullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height, this.shootDirection))
                this.canShoot = false
            }
        })
        document.addEventListener("keyup", (event) => {
            const key = event.key
            if (key === "ArrowLeft") this.canMoveLeft = false
            if (key === "ArrowRight") this.canMoveRight = false
        })
    }
}
class Enemy extends Player {
    constructor(ctx, canvasHeight, canvasWidth, posX) {
        super(ctx, canvasHeight, canvasWidth, posX)

        this.enemyBullets = []

        this.image = new Image()
        this.image.src = './assets/images/player2_IdleLeft.png'

        this.sX = 0
        this.sY = 0
        this.lastFrame = 192
        this.frameIncrement = 48
        this.imageCols = 5
    }

    switchSprites() {
        if (this.shootDirection === 'left' && !this.canMoveLeft) {
            if (this.sX > 192) this.sX = 0
            this.image.src = './assets/images/player2_IdleLeft.png'
            this.imageCols = 5
            this.lastFrame = 192
            this.frameIncrement = 48
        }
        if (this.shootDirection === 'right' && !this.canMoveRight) {
            if (this.sX > 192) this.sX = 0
            this.image.src = './assets/images/player2_Idle.png'
            this.imageCols = 5
            this.lastFrame = 192
            this.frameIncrement = 48
        }
        if (this.canMoveLeft) {
            this.image.src = './assets/images/player2_RunLeft.png'
            this.imageCols = 6
            this.lastFrame = 240
            this.frameIncrement = 48
        }
        if (this.canMoveRight) {
            this.image.src = './assets/images/player2_Run.png'
            this.imageCols = 6
            this.lastFrame = 240
            this.frameIncrement = 48
        }
    }

    draw() {
        this.switchSprites()
        this.ctx.drawImage(this.image, this.sX, this.sY, this.image.width / this.imageCols, this.image.height, this.posX - this.width, this.posY - 20, (this.image.width / this.imageCols) * 2, this.image.height * 2)
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
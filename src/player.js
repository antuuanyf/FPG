class Player {
    constructor(ctx, canvasHeight, canvasWidth, posX) {
        this.ctx = ctx
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight

        this.height = 75
        this.width = 25
        this.posX = posX
        this.posY = this.canvasHeight - this.height - 50
        this.velY = 0
        this.gravity = 0.9

        this.canJump = true
        this.canMoveLeft = false
        this.canMoveRight = false
        this.canShoot = true
        this.shootDirection = ''

        this.lives = 10

        this.bullets = []
    }

    update() {
        this.draw()
        this.move()
        this.activateGravity()
        this.checkFloor()
    }

    draw() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }

    activateGravity() {
        this.velY += this.gravity
    }

    checkFloor() {
        if (this.posY + this.height + this.velY >= this.canvasHeight - 50) {
            this.velY = 0
            this.canJump = true
        }
    }

    move() {
        this.posY += this.velY
        if (this.canMoveLeft && this.posX > 0) this.posX -= 5
        if (this.canMoveRight && this.posX + this.width < this.canvasWidth) this.posX += 5
    }

    setEventListeners() {
        document.addEventListener("keydown", (event) => {
            const key = event.key
            if (key === "a") {
                this.canMoveLeft = true
                this.shootDirection = 'left'
            }
            if (key === "d") {
                this.canMoveRight = true
                this.shootDirection = 'right'
            }
            if (key === "w" && this.canJump) {
                this.velY -= 15
                this.canJump = false
            }
            if (key === "s" && this.canShoot && this.shootDirection === 'left') {
                this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height,this.shootDirection))
                this.canShoot = false
            }
            if (key === "s" && this.canShoot && this.shootDirection === 'right') {
                this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height,this.shootDirection))
                this.canShoot = false
            }
        })
        document.addEventListener("keyup", (event) => {
            const key = event.key
            if (key === "a") this.canMoveLeft = false
            if (key === "d") this.canMoveRight = false
        })
    }
}
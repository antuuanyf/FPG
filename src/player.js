class Player {
    constructor(ctx, canvasHeight, canvasWidth, posX) {
        this.ctx = ctx
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight

        this.height = 60
        this.width = 25
        this.posX = posX
        this.posY = this.canvasHeight - this.height - 130
        this.velY = 0
        this.gravity = 0.9

        this.canJump = true
        this.canMoveLeft = false
        this.canMoveRight = false
        this.canShoot = true
        this.shootDirection = ''
        this.isInLadder = false

        this.lives = 10

        this.bullets = []

        this.image = new Image()
        this.image.src = './assets/images/player1_Idle.png'

        this.sX = 0
        this.sY = 0
        this.lastFrame = 192
        this.frameIncrement = 48
        this.imageCols = 5
    }

    switchSprites() {
        if (this.shootDirection === 'left' && !this.canMoveLeft) {
            if (this.sX > 192) this.sX = 0
            this.image.src = './assets/images/player1_IdleLeft.png'
            this.imageCols = 5
            this.lastFrame = 192
            this.frameIncrement = 48
            console.log('Estatico IZQ')
        }
        if (this.shootDirection === 'right' && !this.canMoveRight) {
            if (this.sX > 192) this.sX = 0
            this.image.src = './assets/images/player1_Idle.png'
            this.imageCols = 5
            this.lastFrame = 192
            this.frameIncrement = 48
            console.log('Estatico DER', this.imageCols, this.lastFrame, this.frameIncrement, this.sX)
        }
        if (this.canMoveLeft) {
            this.image.src = './assets/images/player1_RunLeft.png'
            this.imageCols = 6
            this.lastFrame = 240
            this.frameIncrement = 48
            console.log('Run IZQ')
        }
        if (this.canMoveRight) {
            this.image.src = './assets/images/player1_Run.png'
            this.imageCols = 6
            this.lastFrame = 240
            this.frameIncrement = 48
            console.log('Run DER', this.imageCols, this.lastFrame, this.frameIncrement, this.sX)
        }
    }

    draw() {
        // this.ctx.fillStyle = "blue"
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.switchSprites()
        this.ctx.drawImage(this.image, this.sX, this.sY, this.image.width / this.imageCols, this.image.height, this.posX - this.width, this.posY - 20, (this.image.width / this.imageCols) * 2, this.image.height * 2)
    }

    update() {
        this.draw()
        this.move()
        !this.isInLadder && this.activateGravity()
        this.checkFloor()
    }

    activateGravity() {
        this.velY += this.gravity
    }

    checkFloor() {
        if (this.posY + this.height + this.velY >= this.canvasHeight - 130) {
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
                this.velY -= this.isInLadder ? 5 : 15
                this.canJump = false
            }
            if (key === "s" && this.canShoot && this.shootDirection === 'left') {
                this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height, this.shootDirection))
                this.canShoot = false
            }
            if (key === "s" && this.canShoot && this.shootDirection === 'right') {
                this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height, this.shootDirection))
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
const game = {
    author: "Antonio",
    version: "1.0",
    title: "FPG",
    description: "Fighting Platformer Game.",

    width: null,
    halfWidth: null,
    halfHeight: null,
    height: null,
    canvas: null,
    ctx: null,
    interval: null,
    FPS: 60,
    frames: 0,

    player: null,
    enemy: null,
    platforms: [],
    ladders: [],

    background: null,
    player1Screen: null,
    player2Screen: null,

    initCanvas() {
        this.canvas = document.querySelector("#canvas")
        this.ctx = this.canvas.getContext("2d")
    },

    loadImages() {
        this.player1Screen = new Image()
        this.player1Screen.src = "./assets/images/player1_win.png"
        this.player2Screen = new Image()
        this.player2Screen.src = "./assets/images/player2_win.png"
        this.background = new Image()
        this.background.src = "./assets/images/background.png"
    },

    setDimensions() {
        this.width = window.innerWidth
        this.halfWidth = window.innerWidth / 2
        this.halfHeight = window.innerHeight / 2
        this.height = window.innerHeight
        this.canvas.width = window.innerWidth
        this.canvas.height = this.height
    },

    generateAll() {
        this.player = new Player(this.ctx, this.height, this.width, 50)
        this.enemy = new Enemy(this.ctx, this.height, this.width, this.width - 75)
        console.log(this.player.imageRight.width)
        this.platforms.push(
            new Platform(this.ctx, this.height, 0, 130, this.width, 130), // Floor 0
            new Platform(this.ctx, this.height, this.halfWidth - 60, 300, 250, 25,), // 1
            new Platform(this.ctx, this.height, this.width - 250, this.halfHeight, 250, 25), // 2
            new Platform(this.ctx, this.height, this.halfWidth - 120, this.halfHeight + 30, 250, 25), // 3
            new Platform(this.ctx, this.height, 0, 450, 250, 25), // 4
            new Platform(this.ctx, this.height, 0, 600, 400, 25), // 5
            new Platform(this.ctx, this.height, 0, 300, 500, 25), // 6
            new Platform(this.ctx, this.height, this.halfWidth - 60, 675, 1000, 25), // 7
        ) // ctx, canvasHeight, posX, posY, width, height
        this.ladders.push(
            new Ladder(this.ctx, this.height, this.platforms[1].posX + this.platforms[1].width, this.platforms[1].posY, this.platforms[0].posY - this.platforms[1].posY),
            new Ladder(this.ctx, this.height, 0, this.platforms[4].posY + this.platforms[4].height, this.platforms[6].posY - (this.platforms[4].posY + this.platforms[4].height)),
            new Ladder(this.ctx, this.height, this.platforms[4].width - 30, this.platforms[5].posY + this.platforms[5].height, this.platforms[4].posY - (this.platforms[5].posY + this.platforms[5].height))
        )
    },
    drawAll() {
        this.ctx.drawImage(this.background, 0, 0, this.width, this.height)
        this.platforms.forEach(platform => platform.draw())
        this.ladders.forEach(ladder => ladder.draw())
        this.player.update()
        this.enemy.update()
        this.player.bullets.forEach(bullet => {
            bullet.update()
        })
        this.enemy.enemyBullets.forEach(bullet => {
            bullet.update()
        })
        this.ctx.fillStyle = 'black'
        this.ctx.font = 'bold 20px'
        this.ctx.fillText(`Player 1 lives: ${this.player.lives}`, 30, 30)
        this.ctx.fillText(`Player 2 lives: ${this.enemy.lives}`, this.canvas.width - 135, 30)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    clearItems() {
        this.player.bullets = this.player.bullets.filter(bullet => bullet.posX < this.width)
        this.enemy.enemyBullets = this.enemy.enemyBullets.filter(bullet => bullet.posX < this.width)
    },

    checkCollisions() {
        this.player.bullets.forEach((bullet, index) => {
            if (bullet.posX + bullet.width > this.enemy.posX &&
                bullet.posX < this.enemy.posX + this.enemy.width &&
                bullet.posY + bullet.height > this.enemy.posY &&
                bullet.posY < this.enemy.posY + this.enemy.height) {
                this.enemy.lives--
                this.player.bullets.splice(index, 1)
                if (this.enemy.lives === 0) this.gameFinished(this.player1Screen)
            }
        })

        this.enemy.enemyBullets.forEach((bullet, index) => {
            if (bullet.posX + bullet.width > this.player.posX &&
                bullet.posX < this.player.posX + this.player.width &&
                bullet.posY + bullet.height > this.player.posY &&
                bullet.posY < this.player.posY + this.player.height) {
                this.player.lives--
                this.enemy.enemyBullets.splice(index, 1)
                if (this.player.lives === 0) this.gameFinished(this.player2Screen)
            }
        })

        this.platforms.forEach(platform => {
            if (this.player.posX + this.player.width > platform.posX &&
                this.player.posX < platform.posX + platform.width &&
                this.player.posY + this.player.height + this.player.velY > platform.posY &&
                this.player.posY + this.player.height < platform.posY) {
                this.player.velY = 0
                this.player.canJump = true
            }
            if (this.enemy.posX + this.enemy.width > platform.posX &&
                this.enemy.posX < platform.posX + platform.width &&
                this.enemy.posY + this.enemy.height + this.enemy.velY > platform.posY &&
                this.enemy.posY + this.enemy.height < platform.posY) {
                this.enemy.velY = 0
                this.enemy.canJump = true
            }
        })

        this.player.isInLadder = this.ladders.some(ladder => {
            return (this.player.posX + this.player.width > ladder.posX &&
                this.player.posX < ladder.posX + ladder.width &&
                this.player.posY + this.player.height > ladder.posY &&
                this.player.posY < ladder.posY + ladder.height)
        })

        this.enemy.isInLadder = this.ladders.some(ladder => {
            return (this.enemy.posX + this.enemy.width > ladder.posX &&
                this.enemy.posX < ladder.posX + ladder.width &&
                this.enemy.posY + this.enemy.height > ladder.posY &&
                this.enemy.posY < ladder.posY + ladder.height)
        })

    },

    gameFinished(image) {
        this.clearAll()
        clearInterval(this.interval)
        this.ctx.drawImage(image, 0, 0, this.width, this.height)
        setTimeout(() => {
            location.reload()
        }, 2000)
    },

    start() {
        this.player.setEventListeners()
        this.enemy.setEventListeners()
        this.interval = setInterval(() => {
            this.frames++
            if (this.frames % 10 === 0) {
                this.player.canShoot = true
                this.enemy.canShoot = true
            }
            if (this.frames % 6 === 0) {
                if (this.player.sX === 192) {
                    this.player.sX = 0
                    return
                }
                this.player.sX += 48
            }
            if (this.frames % 6 === 0) {
                if (this.enemy.sX === 192) {
                    this.enemy.sX = 0
                    return
                }
                this.enemy.sX += 48
            }
            this.clearAll()
            this.drawAll()
            this.clearItems()
            this.checkCollisions()
        }, 1000 / this.FPS) // 1000  / 60
    },

    init() {
        this.initCanvas()
        this.loadImages()
        this.setDimensions()
        this.generateAll()
        this.start()
    }
}
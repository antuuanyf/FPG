const game = {
    author: "Antonio",
    version: "1.0",
    title: "FPG",
    description: "Fighting Platformer Game.",

    width: null,
    height: null,
    canvas: null,
    ctx: null,
    interval: null,
    FPS: 60,
    frames: 0,

    player: null,
    enemy: null,

    victoryScreen: null,
    defeatScreen: null,


    initCanvas() {
        this.canvas = document.querySelector("#canvas")
        this.ctx = this.canvas.getContext("2d")
    },

    loadImages() {
        this.victoryScreen = new Image()
        // this.victoryScreen.src = "./assets/images/victory.png"
        this.defeatScreen = new Image()
        // this.defeatScreen.src = "./assets/images/defeat.jpg"
    },

    setDimensions() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = window.innerWidth
        this.canvas.height = this.height
    },

    generateAll() {
        this.player = new Player(this.ctx, this.height, this.width, 50)
        this.enemy = new Enemy(this.ctx, this.height, this.width, this.width - 75)
    },

    drawAll() {
        this.player.update()
        this.enemy.update()
        this.player.bullets.forEach(bullet => {
            bullet.update()
        })
        this.enemy.enemyBullets.forEach(bullet => {
            bullet.update()
        })
        this.ctx.fillStyle = 'black'
        this.ctx.font = 'bold 15px serif'
        this.ctx.fillText(`Player 1 lives: ${this.player.lives}`,30,30)
        this.ctx.fillText(`Player 2 lives: ${this.enemy.lives}`,this.canvas.width-135,30)
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
            if (this.enemy.posX + this.enemy.width > bullet.posX
                && this.enemy.posX < bullet.posX + bullet.width
                && this.enemy.posY + this.enemy.height > bullet.posY) {
                this.enemy.lives--
                this.player.bullets.splice(index, 1)
                if (this.enemy.lives === 0) this.gameFinished(this.defeatScreen)
            }
        })

        this.enemy.enemyBullets.forEach((bullet, index) => {
            if (this.player.posX + this.player.width > bullet.posX
                && this.player.posX < bullet.posX + bullet.width
                && this.player.posY + this.player.height > bullet.posY) {
                this.player.lives--
                this.enemy.enemyBullets.splice(index, 1)
                if (this.player.lives === 0) this.gameFinished(this.defeatScreen)
            }
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
onload = () => {
    const normalButton = document.querySelector("#normal-difficulty")
    const canvas = document.querySelector("#canvas")
    const menu = document.querySelector("#startMenu")
    normalButton.onclick = () => {
        canvas.classList.toggle("non-display")
        menu.classList.toggle("non-display")
        game.init()
    }
}

// NO TOCAR BAJO NINGUN CONCEPTO
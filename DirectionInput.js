class DirectionInput {
    constructor() {
        this.heldDirection = []

        this.map = {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "KeyW": "up",
            "KeyS": "down",
            "KeyA": "left",
            "KeyD": "right"
        }
    }

    init() {
        document.addEventListener("keydown", e => {
            console.log(e.code)
        })
    }
}
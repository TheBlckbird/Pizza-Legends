class DirectionInput {
    constructor() {
        this.heldDirection = []
    }

    init() {
        document.addEventListener("keydown", e => {
            console.log(e.code)
        })
    }
}
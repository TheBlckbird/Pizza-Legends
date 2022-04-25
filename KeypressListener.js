class KeypressListener {
    constructor(keyCode, callback) {
        this.keySafe = true
        this.keyDownFunction = function(event) {
            if (event.keyCode === keyCode) {
                if (keySafe) {
                    keySafe = false
                    callback()
                }
            }
        }
        this.keyUpFunction = function(event) {
            if (event.keyCode === keyCode) {
                keySafe = true
            }
        }

        document.addEventListener("keydown", this.keyDownFunction)
        document.addEventListener("keyup", this.keyUpFunction)
    }
}
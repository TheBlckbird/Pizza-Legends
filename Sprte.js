class Sprite {
    constructor(config) {

        // Set up the Image
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }

        // Configure Animation & Initial State
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        }
        this.currentAnimation = config.curentAnimation || "idleDown"
        this.currentAnimationFrame = 0
    }
}
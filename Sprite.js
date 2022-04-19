class Sprite {
    constructor(config) {

        // Set up the Image
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }

        // Shadows
        this.shadow = new Image()
        this.useShadow = true
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png"
            this.shadow.onload = () => {
                this.isShadowLoaded = true
            }
        }

        // Configure Animation & Initial State
        this.animations = config.animations || {
            "idle-down": [ [0,0] ],
            "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
        }
        this.currentAnimation = config.curentAnimation || "idle-down"
        this.currentAnimationFrame = 0

        this.animationFrameLimit = 16
        this.animationFrameProgress = this.animationFrameLimit

        // Reference to the GameObject
        this.gameObject = config.gameObject

    }

    draw(ctx) {
        const x = this.gameObject.x - 8
        const y = this.gameObject.y - 18

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        ctx.drawImage(
            this.image,
            0, 0,
            32, 32,
            x, y,
            32, 32
        )
    }
}
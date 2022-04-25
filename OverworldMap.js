class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects
        this.walls = config.walls || {}

        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc

        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc

        this.isCutscenePlaying = false
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key]
            object.id  = key

            // Determine if this object should actually be mounted

            object.mount(this)
        })
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction)
        return this.walls[`${x},${y}`] || false
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true

        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init()
        }

        this.isCutscenePlaying = false

        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))

    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true
    }
    removeWall(x, y) {
       delete  this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY)
        const {x, y} = utils.nextPosition(wasX, wasY, direction)
        this.addWall(x, y)
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPLayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png",
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 1200 },
                    { type: "stand", direction: "up", time: 30 },
                ]
            }),
            npcB: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                src: "/images/characters/people/npc2.png",
                behaviorLoop: [
                    { type: "walk", direction: "left" },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "down" },
                ]
            })
        },
        walls: {
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,

        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPLayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(5)
            }),
            npc1: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "/images/characters/people/npc1.png"
            }),
            npc2: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                src: "/images/characters/people/npc2.png"
            })
        }
    }
}
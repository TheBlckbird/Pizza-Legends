class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text
        this.onComplete = onComplete
        this.element = null
    }

    createElement() {
        // Create the element
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
    }
}
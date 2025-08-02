class Boundary {
    constructor({ position }) {
        this.position = position
        this.width = widthMap
        this.height = heightMap
    }

    draw(context) {
        // context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
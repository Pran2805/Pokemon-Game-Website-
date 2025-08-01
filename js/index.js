const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillStyle = '#fff'
context.fillRect(0, 0, canvas.width, canvas.height)


// rendering map
const image = new Image()
image.src = '../tile_assets/Pellet Town.png'
// image takes some time to load that's why we used the onload method



// player image load
const playerImage = new Image()
playerImage.src = '../assets/Images/playerDown.png'

image.onload = () => {
    context.drawImage(image, -590, -400)
    context.drawImage(
        playerImage,
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width / 2 - playerImage.width,
        canvas.height / 2 - playerImage.height,
        playerImage.width/4,
        playerImage.height
    )
}





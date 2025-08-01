const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const image = new Image()
const playerImage = new Image()

image.src = '../tile_assets/Pellet Town.png'
playerImage.src = '../assets/Images/playerDown.png'

// Track image loading
let imagesLoaded = 0
function checkAllImagesLoaded() {
    imagesLoaded++
    if (imagesLoaded === 2) {
        animate()
    }
}

image.onload = checkAllImagesLoaded
playerImage.onload = checkAllImagesLoaded

const background = new Sprite({
    position: {
        x: mapPosWidth,
        y: mapPosHeight
    },
    image: image
})

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)

    background.draw(context)

    context.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )
    if(keys.w.pressed){
        background.position.y += speed
    }
    if(keys.s.pressed){
        background.position.y -= speed
    }
    if(keys.a.pressed){
        background.position.x += speed
    }
    if(keys.d.pressed){
        background.position.x -= speed
    }

    
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w': keys.w.pressed = true; break
        case 'a': keys.a.pressed = true; break
        case 's': keys.s.pressed = true; break
        case 'd': keys.d.pressed = true; break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w': keys.w.pressed = false;; break
        case 'a': keys.a.pressed = false; break
        case 's': keys.s.pressed = false; break
        case 'd': keys.d.pressed = false; break
    }
})

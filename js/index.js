const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70))
}

const boundaries = []
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * 48 + mapPosWidth,
            y: i * 48 + mapPosHeight
          }
        })
      )
    }
  })
})

const collisionRect = ({ player, testBoundary }) => {
  return (
    player.position.x + player.width >= testBoundary.position.x &&
    player.position.x <= testBoundary.position.x + testBoundary.width &&
    player.position.y + player.height >= testBoundary.position.y &&
    player.position.y <= testBoundary.position.y + testBoundary.height
  )
}

const image = new Image()
image.src = '../tile_assets/Pellet Town.png'

const playerImage = new Image()
playerImage.src = '../assets/Images/playerDown.png'

const foregroundImage = new Image()
foregroundImage.src = '../tile_assets/ForegroundObject.png'

let imagesLoaded = 0
function checkAllImagesLoaded() {
  imagesLoaded++
  if (imagesLoaded === 2 && player) {
    animate()
  }
}

const background = new Sprite({
  position: {
    x: mapPosWidth,
    y: mapPosHeight
  },
  image: image
})
const foreground = new Sprite({
  position: {
    x: mapPosWidth,
    y: mapPosHeight
  },
  image: foregroundImage
})



let player = null

playerImage.onload = () => {
  player = new Sprite({
    position: {
      x: canvas.width / 2 - (playerImage.width / 4) / 2 - 50,
      y: canvas.height / 2 - playerImage.height / 2 - 30
    },
    image: playerImage,
    frames: {
      max: 4
    }
  })
  checkAllImagesLoaded()
}

image.onload = checkAllImagesLoaded

const movables = [background, ...boundaries, foreground]

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
}

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  background.draw(context)
  boundaries.forEach(boundary => {
    boundary.draw(context)
    if (collisionRect({ player, testBoundary: boundary })) {
      console.log('colliding')
    }
  })

  if (player) {
    player.draw(context)
  }

  foreground.draw(context)
 if (keys.w.pressed) {
  let moving = true
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      collisionRect({
        player: player,
        testBoundary: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y + speed
          }
        }
      })
    ) {
      moving = false
      break
    }
  }
  if (moving) {
    movables.forEach(m => (m.position.y += speed))
  }
}

if (keys.s.pressed) {
  let moving = true
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      collisionRect({
        player: player,
        testBoundary: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y - speed
          }
        }
      })
    ) {
      moving = false
      break
    }
  }
  if (moving) {
    movables.forEach(m => (m.position.y -= speed))
  }
}

if (keys.a.pressed) {
  let moving = true
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      collisionRect({
        player: player,
        testBoundary: {
          ...boundary,
          position: {
            x: boundary.position.x + speed,
            y: boundary.position.y
          }
        }
      })
    ) {
      moving = false
      break
    }
  }
  if (moving) {
    movables.forEach(m => (m.position.x += speed))
  }
}

if (keys.d.pressed) {
  let moving = true
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      collisionRect({
        player: player,
        testBoundary: {
          ...boundary,
          position: {
            x: boundary.position.x - speed,
            y: boundary.position.y
          }
        }
      })
    ) {
      moving = false
      break
    }
  }
  if (moving) {
    movables.forEach(m => (m.position.x -= speed))
  }
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
    case 'w': keys.w.pressed = false; break
    case 'a': keys.a.pressed = false; break
    case 's': keys.s.pressed = false; break
    case 'd': keys.d.pressed = false; break
  }
})


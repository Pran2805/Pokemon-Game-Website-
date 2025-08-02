for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70))
}

for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, i + 70))
}

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

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      battleZones.push(
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

let imagesLoaded = 0

function checkAllImagesLoaded() {
  imagesLoaded++
  if (imagesLoaded === 2 && player) {
    // animate()
    animateBattle() // comment out after testing
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
const emby = new Sprite({
  position:{
    x: 280,
    y: 325
  }, 
  image: embyImage,
  frames:{
    max: 4,
    hold: 30
  },
  animate: true
})
const draggle = new Sprite({
  position:{
    x: 800,
    y: 100
  }, 
  image: draggleImage,
  frames:{
    max: 4,
    hold: 30
  },
  animate: true
})
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})
let player = null

playerDown.onload = () => {
  player = new Sprite({
    position: {
      x: canvas.width / 2 - (playerDown.width / 4) / 2 - 50,
      y: canvas.height / 2 - playerDown.height / 2 - 30
    },
    image: playerDown,
    frames: {
      max: 4
    }
  })
  checkAllImagesLoaded()
}

image.onload = checkAllImagesLoaded

const movables = [background, ...boundaries, foreground, ...battleZones]

// can't move his function in function.js
const battleZoneAreaDetect = (animationId) => {
  for (let i = 0; i < battleZones.length; i++) {
    const battleZone = battleZones[i]
    const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
      Math.max(player.position.x, battleZone.position.x)) *
      (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
        Math.max(player.position.y, battleZone.position.y))
    if (
      collisionRect({
        player: player,
        testBoundary: battleZone
      })
      && overlappingArea > (player.width * player.height) / 2
      && Math.random() < 0.05
    ) {
      battle.initated = true
      window.cancelAnimationFrame(animationId)
      innerDiv.classList.add('blink')

      setTimeout(() => {
        innerDiv.classList.remove('blink');
        // Now activate the battle
        animateBattle();
      }, 5000);

      break
    }
  }
}

function animate() {
  const animationId = requestAnimationFrame(animate)
  console.log(animationId)
  context.clearRect(0, 0, canvas.width, canvas.height)

  background.draw(context)
  boundaries.forEach(boundary => {
    boundary.draw(context)
  })


  battleZones.forEach(battleZone => {
    battleZone.draw(context)
  })

  if (player) {
    player.draw(context)
  }

  foreground.draw(context)
  player.animate = false

  if (battle.initated) return
  if (keys.w.pressed) {
    let moving = true
    player.image = playerUp
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true
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
    battleZoneAreaDetect(animationId)

    if (moving) {
      movables.forEach(m => (m.position.y += speed))
    }
  } else if (keys.s.pressed) {
    let moving = true
    player.image = playerDown
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true
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

    battleZoneAreaDetect(animationId)
    if (moving) {
      movables.forEach(m => (m.position.y -= speed))
    }
  } else if (keys.a.pressed) {
    let moving = true
    player.image = playerLeft
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true
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

    battleZoneAreaDetect(animationId)
    if (moving) {
      movables.forEach(m => (m.position.x += speed))
    }
  } else if (keys.d.pressed) {
    let moving = true
    player.image = playerRight
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true
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

    battleZoneAreaDetect(animationId)
    if (moving) {
      movables.forEach(m => (m.position.x -= speed))
    }
  }
}


function animateBattle() {
  window.requestAnimationFrame(animateBattle)

  // Clear or fill canvas if needed
  context.clearRect(0, 0, canvas.width, canvas.height);
  battleBackground.draw(context)
  draggle.draw(context)
  emby.draw(context)
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w': keys.w.pressed = true; break
    case 'a': keys.a.pressed = true; break
    case 's': keys.s.pressed = true; break
    case 'd': keys.d.pressed = true; break
    case 'ArrowUp': keys.w.pressed = true; break
    case 'ArrowLeft': keys.a.pressed = true; break
    case 'ArrowDown': keys.s.pressed = true; break
    case 'ArrowRight': keys.d.pressed = true; break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w': keys.w.pressed = false; break
    case 'a': keys.a.pressed = false; break
    case 's': keys.s.pressed = false; break
    case 'd': keys.d.pressed = false; break
    case 'ArrowUp': keys.w.pressed = false; break
    case 'ArrowLeft': keys.a.pressed = false; break
    case 'ArrowDown': keys.s.pressed = false; break
    case 'ArrowRight': keys.d.pressed = false; break
  }
})
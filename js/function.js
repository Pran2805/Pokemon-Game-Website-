const collisionRect = ({ player, testBoundary }) => {
  return (
    player.position.x + player.width >= testBoundary.position.x &&
    player.position.x <= testBoundary.position.x + testBoundary.width &&
    player.position.y + player.height >= testBoundary.position.y &&
    player.position.y <= testBoundary.position.y + testBoundary.height
  )
}

const pianokeyz = document.querySelectorAll(".piano-keys .key")
const startButton = document.querySelector("#start-button")
const message = document.querySelector("#message")
const MAX_LEVEL = 12

let gameSequence = []
let playerSequence = []
let level = 0
let gameStarted = false


// Function to start/restart the game
const startGame = () => {
  if (!gameStarted) {
    gameSequence = []
    playerSequence = []
    level = 0
    gameStarted = true
    message.textContent = "Level " + (level + 1)
    nextTurn()

    startButton.addEventListener("click", () => {
        // Play the audio here
        audio.play()
      })
  }
}

// Function to generate the next turn
const nextTurn = () => {
    playerSequence = []
    level++
    message.textContent = `Level ${level}`
    addToSequence()
    playSequence()
  }
  

// Function to add a random key to the game sequence
const addToSequence = () => {
  const randomIndex = Math.floor(Math.random() * pianokeyz.length)
  gameSequence.push(pianokeyz[randomIndex].dataset.key)
}

console.log(addToSequence)
// Function to play the game sequence to the player
const playSequence = () => {
  let i = 0
  const interval = setInterval(() => {
    if (i < gameSequence.length) {
      playTune(gameSequence[i])
      i++
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

console.log(playSequence)
console.log(playerSequence)

// Function to handle player's key press
const handleKeyPress = (e) => {
  if (gameStarted) {
    const key = e.key.toUpperCase()
    playTune(key)
    playerSequence.push(key)

    if (playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
      gameOver()
      return
    }

    if (playerSequence.length === gameSequence.length) {
      if (level === MAX_LEVEL) {
        message.textContent = "You win!"
        gameStarted = false
      } else {
        setTimeout(nextTurn, 1000)
      }
    }
  }
}

// Function to handle game over
const gameOver = () => {
  message.textContent = "Game Over! Press Start to Play Again"
  gameStarted = false
}

// Event listeners
startButton.addEventListener("click", startGame)
document.addEventListener("keydown", handleKeyPress)

// Initialize the game
startGame()



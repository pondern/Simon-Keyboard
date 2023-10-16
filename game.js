const startButton = document.querySelector("#start-button")
const pianokeyz = document.querySelectorAll(".piano-keys .key")
const message = document.querySelector("#message")
const modal = document.querySelector('.modal')
const modalContent = document.querySelector(".modal-content")
const exitModal = document.querySelector(".modal-close")
const MAX_LEVEL = 2


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
    message.textContent = `Level ${level + 1}`
    nextTurn()    
  }
}

startButton.addEventListener("click", () => {
  startGame()
})

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

// Function to play the game sequence to the player
const playSequence = () => {
    let i = 0
    const interval = setInterval(() => {
      if (i < gameSequence.length) {
        playTune(gameSequence[i])
        i++
      } else {
        clearInterval(interval)
        // After playing the sequence, allow the user to start their turn.
        setTimeout(() => {
          listenForPlayerInput()
        }, 500)
      }
    }, 1000) // Adjust the interval timing as needed
  }
  
 // Function to handle player's key press
const handleKeyPress = (e) => {
  if (gameStarted) {
    const key = e.key.toLowerCase()
    handlePlayerInput(key)
  }
}

// Function to handle player's click
const handleClick = (clickedKey) => {
  if (gameStarted) {
    handlePlayerInput(clickedKey)
  }
}

// Function to handle player input
const handlePlayerInput = (inputKey) => {
  playTune(inputKey)
  playerSequence.push(inputKey)

  if (playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
    gameOver()
    return
  }

  if (playerSequence.length === gameSequence.length) {
    if (level === MAX_LEVEL) {
      modalContent.innerText = "You win!"
      gameStarted = false
      openModal()
    } else {
      setTimeout(nextTurn, 1000)
    }
  }
}

// Function to handle game over
const gameOver = () => {
  modalContent.innerText = "Game Over! Press Start to Play Again"
  gameStarted = false
  openModal()
}

// Event listeners for both 'keydown' and 'click'
document.addEventListener("keydown", (e) => handleKeyPress(e))
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => {
    const clickedKey = key.dataset.key
    handleClick(clickedKey)
  })
})

// Function to open the modal
const openModal = () => {
  modal.classList.add('open');
}


// Function to close the modal
const closeModal = () => {
  console.log("clicked")
  modal.classList.remove('open');
}

exitModal.addEventListener("click", closeModal)
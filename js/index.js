(() => {
  let numArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
  let boardLocked = false
  let hasFlippedCard = false
  let firstCard, secondCard
  let nums = 0
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
  }
  let newNumArray = shuffle(numArray)

  function createGameField() {
    const playField = document.createElement('ul')
    playField.classList.add('play-field')
    return playField
  }

  function createCards() {
    const card = document.createElement('li')
    const front = document.createElement('div')
    const back = document.createElement('div')
    card.classList.add('card')
    front.classList.add('front')
    back.classList.add('back')

    card.append(front, back)

    return {
      card,
      front,
      back
    }
  }

  function createResetBtn() {
    const btn = document.createElement('button')
    btn.textContent = 'Начать заново'
    btn.classList.add('reset-btn')
    return btn
  }
  const resetBtn = createResetBtn()

  const flipCard = e => {
    if (boardLocked) return
    const target = e.target.parentElement
    if (target === firstCard) return
    target.classList.add('flip')

    if (!hasFlippedCard) {
      hasFlippedCard = true
      firstCard = target
    } else {
      hasFlippedCard = false
      secondCard = target
      checkForMatch()
    }
  }

  const checkForMatch = () => {
    if (firstCard.dataset.number === secondCard.dataset.number) {
      firstCard.removeEventListener('click', flipCard)
      secondCard.removeEventListener('click', flipCard)
      nums += 2
      if (nums === newNumArray.length) {
        resetBtn.classList.add('show')
      }
    } else {
      boardLocked = true
      setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
      }, 1000)
    }
  }

  const resetBoard = () => {
    boardLocked = false
    firstCard = secondCard = null
  }

  function createGame() {
    const gameContainer = document.getElementById('pairs')
    const field = createGameField()

    gameContainer.append(field, resetBtn)

    for (let i = 0; i < newNumArray.length; i++) {
      const cardItem = createCards()
      let value = newNumArray[i]
      cardItem.card.dataset.number = value
      cardItem.back.textContent = value
      field.append(cardItem.card)
      cardItem.card.addEventListener('click', flipCard)
    }

    resetBtn.addEventListener('click', () => {
      resetBtn.classList.remove('show')
      shuffle(newNumArray)
      const cards = document.querySelectorAll('.card')
      const backs = document.querySelectorAll('.back')
      cards.forEach(card => {
        card.classList.remove('flip')
        card.addEventListener('click', flipCard)
        for (let i = 0; i < newNumArray.length; i++) {
          let value = newNumArray[i]
          card.dataset.number = value
        }
      })
      backs.forEach(back => {
        for (let i = 0; i < newNumArray.length; i++) {
          let value = newNumArray[i]
          back.textContent = value
        }
      })

    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    createGame()
  })
})()
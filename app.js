const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const scoreEl = document.querySelector('#score')
const board = document.querySelector('#board')
const colors = ['#ED4747', '#F48647', '#E8CF4D', '#7AEE70', '#6AF1C8', '#3F63E1', '#CD3FF0', '#EB77A1']

let time = 0
let score = 0
let maxScore = 0
let interval

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame(time)
    }
})


board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        setScore(score)
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    score = 0
    setScore(score)

    createRandomCircle()

    setTime(time)
    board.addEventListener('click', startTime)
}

function startTime(event) {
    if (event.target.classList.contains('circle')){
        interval = setInterval(decreaseTime, 1000)
        board.removeEventListener('click', startTime)
    }
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function setScore(value){
    scoreEl.innerHTML = `${value}`
}

function finishGame() {
    clearInterval(interval)
    if (score > maxScore) maxScore = score

    board.innerHTML = `<h1>Счет: <span class="primary">${score}<span></h1>
    <h3>Лучший счет: ${maxScore}</h3>`

    const restartBtn = document.createElement('button')
    restartBtn.classList.add('time-btn')
    restartBtn.innerText = 'Еще раз?'
    board.append(restartBtn)

    restartBtn.addEventListener('click', restartGame)
    scoreEl.classList.add('hide')
    timeEl.parentNode.classList.add('hide')
}

function restartGame() {
    board.innerHTML = ''
    timeEl.parentNode.classList.remove('hide')
    scoreEl.classList.remove('hide')
    screens[1].classList.remove('up')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    board.append(circle)

    const {width, height} = board.getBoundingClientRect()

    const size = getRandomSize(10, 50)
    const x = getRandomSize(0, width - size)
    const y = getRandomSize(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = getRandomColor()

}

function getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}


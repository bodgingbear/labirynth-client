const socket = io('http://localhost:1337/user')

const joinGame = team => () => {
    socket.emit('join', {team})
}

// emit join-game
const $joinRed = document.getElementById('join-red')
$joinRed.addEventListener('click', joinGame('teamA'))

const $joinBlue = document.getElementById('join-blue')
$joinBlue.addEventListener('click', joinGame('teamB'))

let selectedBorderId = null
const $borderInputs = document.querySelectorAll('#border')
$borderInputs.forEach($border => $border.addEventListener('click', (event) => {
    if(selectedBorderId !== null) {
        document.querySelector(`[borderId="${selectedBorderId}"]`).classList.remove('selected')
    }

    event.target.classList.add('selected')

    const borderId = event.target.getAttribute('borderId')
    selectedBorderId = borderId
}))

const $submitBtn = document.getElementById('submit-btn')
$submitBtn.addEventListener('click', () => {
    socket.emit('submit', selectedBorderId)
})
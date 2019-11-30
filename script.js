const socket = io('http://localhost:3000/user')

const joinGame = team => () => {
    socket.emit('join', {team})
}

// emit join-game
const $joinRed = document.getElementById('join-red')
$joinRed.addEventListener('click', joinGame('teamA'))

const $joinBlue = document.getElementById('join-blue')
$joinBlue.addEventListener('click', joinGame('teamB'))



let socketUrl = 'http://localhost:1337';

if (!(/(^\d+\.)|(^localhost$)/.test(window.location.hostname))) {
    socketUrl = 'https://bb-pgg-labyrinth.herokuapp.com';
}

const socket = io(`${socketUrl}/user`);

let teamId = null
const joinGame = team => () => {
    teamId = team
    socket.emit('join', JSON.stringify({team}))
    $teamName = document.createElement('div');
    $teamName.classList.add('teamText');
    const teamStr = team.substr(0, 4) + ' ' + team.substr(4, 5);
    $teamName.textContent = teamStr.toUpperCase();
    $teamName.style.color = team === 'teamA' ? '#ff00ff' : '#fff000';
    document.querySelector('.container').prepend($teamName);
    document.querySelector('#choose-screen').classList.remove('hidden');
    document.querySelector('#join-container').classList.add('hidden');
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
    selectedBorderId = +borderId
}))

let waitingTimeout;

const $submitBtn = document.getElementById('submit-btn')
$submitBtn.addEventListener('click', () => {
    socket.emit('submit', JSON.stringify({ doorIndex: selectedBorderId }));

    selectedBorderId = null;
    document.querySelector('.selected').classList.remove('selected');
    waitingTimeout = setTimeout(() => {
        document.querySelector('#waiting-screen').style.setProperty('visibility', 'visible')
    }, 100);
})

socket.on('game-update', ({team: {id}}) => {
    if(id !== teamId) {
        return
    }

    clearTimeout(waitingTimeout);
    document.querySelector('#waiting-screen').style.setProperty('visibility', 'hidden')
})

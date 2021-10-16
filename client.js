const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio("ting.mp3");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position=='left'){
        audio.play();
    }
}


const name = promp("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the Chat`, 'right' )
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.massage}` , 'leftt' )
})

socket.on('left', name=>{
    append(`${name} left the Chat`, 'right' )
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
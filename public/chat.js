const socket = io.connect('http://localhost:3000/');

let handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    sendBtn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

sendBtn.addEventListener('click', ()=> {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p>${data} is typing message...</p>`;
});
const socket = io('https://ichat4.onrender.com', { transports: ['websocket', 'polling', 'flashsocket'] });
const form = document.getElementById('send-container');
const messageInput = document.getElementById('message_input');
const attachment = document.getElementById('attachment');
const messageContainer = document.querySelector('.card-body');
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('d-flex flex-row justify-content-start mb-4');
  messageContainer.append(messageElement);
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(messageInput.value)
  let messageElement = document.createElement('div');
  messageElement.classList.add('justify-content-end');
  messageElement.innerHTML = `
    <div class="d-flex flex-row mb-4">
                    <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                      <p class="small mb-0">You: ${messageInput.value}</p>
                    </div>
                  </div> `;
  messageElement.classList.add('d-flex');
  messageContainer.append(messageElement)
  socket.emit('send', messageInput.value);
  messageInput.value = "";
})
const username = prompt("Enter Name to join live chat");
console.log(username);
socket.emit('new-user-joined', username);
socket.on('user-joined', data => {
  let messageElement = document.createElement('div');
  messageElement.innerHTML = `
    <div style="color: Red;" class="d-flex flex-row justify-content-start mb-4">
                    <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                      <p class="small mb-0">"${data}" Joined this live chat</p>
                    </div>
                  </div> `;
  messageElement.classList.add('d-flex');
  messageContainer.append(messageElement)
})
socket.on('receive', data => {
  let messageElement = document.createElement('div');
  messageElement.classList.add('justify-content-start');
  messageElement.innerHTML = `
    <div class="d-flex flex-row mb-4">
                    <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                      <p class="small mb-0">${data.name}: ${data.message}</p>
                    </div>
                  </div> `;
  messageElement.classList.add('d-flex');
  messageContainer.append(messageElement)
})
socket.on("leave", data => {
  let messageElement = document.createElement('div');
  messageElement.innerHTML = `
    <div style="color: Red;" class="d-flex flex-row justify-content-start mb-4">
                    <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                      <p class="small mb-0">"${data}" Leaved</p>
                    </div>
                  </div> `;
  messageElement.classList.add('d-flex');
  messageContainer.append(messageElement)
})

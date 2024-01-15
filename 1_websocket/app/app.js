// connect with backend
const socket = new WebSocket('ws://localhost:3000')

//input send function
function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input.value) {
        socket.send(input.value)
        input.value = ""
    }
    input.focus()
}

//adding event listerner to call the function
document.querySelector('form')
    .addEventListener('submit', sendMessage)

//this code, send message to backend, 
//after bakcend recives the message, it resend it to the frontend

// Listen for messages, that comes from bakcend
socket.addEventListener("message", ({ data }) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})
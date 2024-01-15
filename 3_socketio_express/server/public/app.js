// connect with backend
const socket = io('ws://localhost:3500')

//input send function
function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input.value) {
        socket.emit("message", input.value)  // creating socket event
        input.value = ""
    }
    input.focus()
}

//adding event listerner to call the function
document.querySelector('form')
    .addEventListener('submit', sendMessage)

//this code, send message to backend, 
//after bakcend recives the message, it resend it to the frontend

// Listen for event name "message", that comes from bakcend and add to list
socket.on("message", (data) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})
const socket = io()

socket.on('newProduct', data => {
    console.log(data)
})

/* socket.on('refreshProducts', data => {
    const realtimeDocument = document.getElementById(realtimeDiv);

}) */
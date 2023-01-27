const socket = io()

socket.on('newProduct', data => {
    console.log(data);
})

socket.on('productDeleted', data => {
    console.log(data);
})
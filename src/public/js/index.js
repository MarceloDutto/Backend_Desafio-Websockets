const socket = io();

const renderProducts = (data) => {
    let productsContainer = document.querySelector("#products-container");
    productsContainer.innerHTML = '';

    if(data.length === 0) {
        productsContainer.innerHTML = '<p>¡Lo sentimos! Temporalmente no podemos mostrate nuestros productos. Regresa más tarde.</p>'
    } else {

        data.forEach(product => {
            let productDiv = document.createElement('div');
            
            let divContent = `
            <p>Nombre: ${product.title}</p>
            <p>Descripción: ${product.description}</p>
            <p>Categoría: ${product.category}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <p>ID: ${product.id}</p>
            <p>Código de producto: ${product.code}</p>`
    
            productDiv.innerHTML = divContent;
    
            productsContainer.appendChild(productDiv);
        });
    }
}

socket.on('newProduct', data => {
    renderProducts(data);
})


socket.on('productDeleted', data => {
    renderProducts(data);
})
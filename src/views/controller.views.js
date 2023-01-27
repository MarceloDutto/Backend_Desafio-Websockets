import { Router } from 'express';
/* import { io } from 'socket.io-client'; */
import { getProducts, addProduct, deleteProduct } from '../products/controller.products.js';
import { io } from '../app.js'

const router = Router();

router.get('/', async (req, res) => {
    
    const products = await getProducts();

    if(products === []) return res.status(500).render('home.handlebars', {
        showProducts: false});
    
    res.render("home.handlebars", {
        showProducts: true,
        products
    })
})


router.get('/realtimeproducts', async (req, res) => {

    io.on('connect', (socket) => {
        console.log(`New client connected with id ${socket.id}`);  
        
    })
    
    const products = await getProducts();

    if(products === []) return res.status(500).render('home.handlebars', {
        showProducts: false});
    
    res.render("home.handlebars", {
        showProducts: true,
        products
    })
})

router.post('/realtimeproducts', (req, res) => {
    const returned = addProduct(req.body);
    const { success, httpStatus, message, allProducts } = returned;

    if(success === false) return res.status(httpStatus).render('realTimeProducts.handlebars', {
        showProducts: false,
        addProductMessage: message
    })

    io.emit('newProduct', allProducts)

    res.render('realTimeProducts.handlebars', {
        showProducts: true,
        addProductMessage: message
    })


})

/* router.delete("/realtimeproducts/:id", (req, res) => {
    const { id } = req.params;

    const returned = deleteProduct(id);
    const { success, httpStatus, message } = returned;
}) */

export default router;
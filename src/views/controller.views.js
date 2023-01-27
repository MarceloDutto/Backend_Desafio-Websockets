import { Router } from 'express';
import { getProducts, addProduct, deleteProduct } from '../products/productsManager.js';
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

    io.on('connection', socket => {
        console.log(`New client connected with id ${socket.id}`);  
    })
    
    const products = await getProducts();

    if(products === []) return res.status(500).render('realTimeProducts.handlebars', {
        showProducts: false});
    
    res.render("realTimeProducts.handlebars", {
        showProducts: true,
        products
    })
})

router.post('/realtimeproducts', async (req, res) => {

    try {
        const allProducts = await addProduct(req.body);
        io.emit('newProduct', allProducts);
        res.status(201).json({message: 'Producto creado'});
    } catch(error) {
        console.log(error);
        res.status(500).json('No se puedo crear el producto');
    }
})

router.delete("/realtimeproducts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const allProducts = await deleteProduct(parseInt(id));
        io.emit('productDeleted', allProducts);
        res.json(({message: 'Producto eliminado'}));
    } catch(error) {
        console.log(error);
        res.status(500).json('No se pudo eliminar el producto');
    }
})

export default router;
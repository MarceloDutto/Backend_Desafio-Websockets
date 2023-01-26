import { Router } from 'express';
import { getProducts, addProduct, deleteProduct } from '../products/controller.products.js';

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
    const products = await getProducts();

    if(products === []) return res.status(500).render('realTimeProducts.handlebars', {
        showProducts: false});
    
    res.render("realTimeProducts.handlebars", {
        showProducts: true,
        products
    })
})

/* router.post('/realtimeproducts', (req, res) => {
    const returned = addProduct(req.body);
    const { success, httpStatus, message } = returned;

    if(success === false) res.status(httpStatus).render('realTimeProducts.handlebars', {
        message
    })
}) */

/* router.delete("/realtimeproducts/:id", (req, res) => {
    const { id } = req.params;

    const returned = deleteProduct(id);
    const { success, httpStatus, message } = returned;
}) */

export default router;
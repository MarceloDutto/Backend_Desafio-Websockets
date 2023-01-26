import __dirname from '../utils.js';
import fs, { existsSync, promises, writeFile } from 'fs';

const path = __dirname + '/products/products.json';
let allProducts = [];

export const getProducts = async () => {
    if(!existsSync(path)) return allProducts = [];

    try {
        const data = await promises.readFile(path, 'utf-8');
        allProducts = JSON.parse(data);
        return allProducts;

    } catch (error) {
        console.log(error);
        return allProducts = [];
    }
}

export const addProduct = async (params) => {
    const { title, description, code, price, status=true, stock, category } = params;
    if(!title || !description || !code || !price || typeof(status) !== 'boolean' || !stock || !category) return {success: false, httpStatus:400, message: 'Error en los campos ingresados'};

    if(!existsSync(path)) {
        allProducts = []
    } else {
        try{
            const data = await promises.readFile(path, 'utf-8');
            allProducts = JSON.parse(data);
        } catch (error) {
            console.log(error);
            return {success:false, httpStatus:500, message: 'Error al acceder a la base de datos'};
        }
    }

    if(allProducts.find(prod => prod.code === code)) return {success: false, httpStatus:400, message: 'El producto ya se encuentra ingresado'};

    const IdArray = allProducts.map(prod => prod.id);
    const maxId = Math.max(...IdArray);

    const product = {
        id: maxId === -Infinity ? 1 : maxId + 1,
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    }
    
    allProducts.push(product);

    const productStr = JSON.stringify(allProducts, null, 2);
    writeFile(path, productStr, error => {
        if(error) throw error;
    });

    return {success: true, httpStatus:200, message: 'El producto fue creado exitosamente'};
}

export const deleteProduct = async (id) => {
    if(!existsSync(path)) return {success: false, httpStatus: 404, message: 'No existe la base de datos'};

    try {
        const data = await promises.readFile(path, 'utf-8');
        allProducts = JSON.parse(data);
    } catch (error) {
        console.log(error);
        return {success: false, httpStatus:500, message: 'Error al acceder a la base de datos'};
    }

    const indexById = allProducts.findIndex(prod => prod.id === id);
    if(indexById === -1) return {success: false, httpStatus: 404, message: 'No se encontró el producto'};
    allProducts.splice(indexById, 1);

    const productStr = JSON.stringify(allProducts, null, 2);
        writeFile(path, productStr, error => {
            if(error) throw error;
        });

    return {success: true, httpStatus:200, message: 'Producto eliminado'}
} 


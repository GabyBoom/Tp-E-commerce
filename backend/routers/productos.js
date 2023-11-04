const { Categoria } = require('../models/categoria');
const {Producto} = require('../models/producto');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    // localhost:3000/api/v1/productos?categorias=1213123,2131233
    let filter = {};
    if(req.query.categorias)
    {
        filter = {category: req.query.categorias.split(',')}
    }
    const productoLista = await Producto.find(filter).populate('category');

    if(!productoLista) {
        res.status(500).json({success: false});
    }
    res.send(productoLista);
});

router.get(`/:id`, async (req, res) => {
    const producto = await Producto.findById(req.params.id).populate('category');

    if(!producto) {
        res.status(500).json({success: false});
    }
    res.send(producto);
});

router.post(`/`, async (req, res) => {
    const categoria = await Categoria.findById(req.body.category);
    if(!categoria) return res.status(400).send('Categoria Invalida')

    const producto = new Producto ({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
    })


    const productoGuardado = await producto.save();

    if(!producto)
    return res.status(500).send('El producto no puede ser creado');
    res.send(producto);
});

router.put('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Id del producto Invalido')
    }
    const categoria = await Categoria.findById(req.body.category);
    if(!categoria) return res.status(400).send('Categoria Invalida')
    
    const producto = await Producto.findByIdAndUpdate(
        req.params.id, 
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.categoria,
            countInStock: req.body.countInStock
        },
        {new: true}
    )

    if(!producto) 
        return res.status(500).send('El producto no puede ser actualizado');
        res.send(producto);
});

router.delete('/:id', (req, res) => {
    Producto.findByIdAndRemove(req.params.id).then(producto => {
        if(producto) {
            return res.status(200).json({success: true, message: 'El producto se ha eliminado'})
        } else {
            return res.status(404).json({success: false, message: 'El producto no existe'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})



router.get(`/get/count`, async (req, res) => {
    const productoCuenta = await Producto.countDocuments();

    res.send({
        productoCuenta,
    });
});

module.exports = router;
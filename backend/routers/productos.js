const { Categoria } = require('../models/categoria');
const {Producto} = require('../models/producto');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const productoLista = await Producto.find();

    if(!productoLista) {
        res.status(500).json({success: false});
    }
    res.send(productoLista);
});

router.post(`/`, async (req, res) => {
    const categoria = await Categoria.findById(req.body.category);
    if(!categoria) return res.status(400).send('Categoria Invalida')

    const producto = new Producto ({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })


    const productoGuardado = await producto.save();

    if(!producto)
    return res.status(500).send('El producto no puede ser creado');
    res.send(producto);
});

module.exports = router;
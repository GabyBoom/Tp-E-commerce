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

router.post(`/`, (req, res) => {
    const producto = new Producto ({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    producto.save().then((crearProducto=>{
        res.status(201).json(crearProducto)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
});

module.exports = router;
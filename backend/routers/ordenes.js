const { Orden } = require('../models/orden');
const express = require('express');
const { OrdenProducto } = require('../models/orden-producto')
const router = express.Router();

router.get('/', async (req, res) => {
    const ordenLista = await Orden.find();

    if(!ordenLista) {
        res.status(500).json({success: false});
    }
    res.send(ordenLista);
});

router.get('/:id', async (req, res) => {
    const orden = await Orden.findById(req.params.id)
    .populate({
        path: 'ordenProductos', populate: {
            path: 'producto', populate: 'category'}
        });

    if(!orden) {
        res.status(500).json({success: false});
    }
    res.send(orden);
})


router.post('/', async (req, res) => {
   const ordenProductosIds = Promise.all(req.body.ordenProductos.map(async ordenProducto => {
        let nuevoOrdenProducto = new OrdenProducto({
            cantidad: ordenProducto.cantidad,
            producto: ordenProducto.producto
        })

        nuevoOrdenProducto = await nuevoOrdenProducto.save();

        return nuevoOrdenProducto._id;
   }))
    const ordenProductosIdsResolved = await ordenProductosIds;
   

    let orden = new Orden({
        ordenProductos: ordenProductosIdsResolved,
        direccionEnvio: req.body.direccionEnvio,
        direccionEnvio2: req.body.direccionEnvio2,
        ciudad: req.body.ciudad,
        codigoPostal: req.body.codigoPostal,
        pais: req.body.pais,
        celular: req.body.celular,
        estado: req.body.estado,
        precioTotal: req.body.precioTotal,
    })
     orden = await orden.save();

    if(!orden) 
    return res.status(400).send('La orden no puede ser creada');

    res.send(orden);
});

module.exports = router;
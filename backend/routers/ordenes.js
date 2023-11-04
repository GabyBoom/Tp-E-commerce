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
   const ordenProductosIds = Promise.all(req.body.ordenProductos.map(async (ordenProducto) => {
        let nuevoOrdenProducto = new OrdenProducto({
            cantidad: ordenProducto.cantidad,
            producto: ordenProducto.producto
        })

        nuevoOrdenProducto = await nuevoOrdenProducto.save();

        return nuevoOrdenProducto._id;
   }))
    const ordenProductosIdsResolved = await ordenProductosIds;

    const preciosTotales = await Promise.all(ordenProductosIdsResolved.map(async (ordenProductoId) => {
        const ordenProducto = await OrdenProducto.findById(ordenProductoId).populate('producto', 'price');
        const precioTotal = ordenProducto.producto.price * ordenProducto.cantidad;
        return precioTotal
    }))

    const precioTotal = preciosTotales.reduce((a, b) => a + b, 0)

    let orden = new Orden({
        ordenProductos: ordenProductosIdsResolved,
        direccionEnvio: req.body.direccionEnvio,
        direccionEnvio2: req.body.direccionEnvio2,
        ciudad: req.body.ciudad,
        codigoPostal: req.body.codigoPostal,
        pais: req.body.pais,
        celular: req.body.celular,
        estado: req.body.estado,
        precioTotal: precioTotal,
    })
     orden = await orden.save();

    if(!orden) 
    return res.status(400).send('La orden no puede ser creada');

    res.send(orden);
});

router.put('/:id', async (req, res) => {
    const orden = await Orden.findByIdAndUpdate(
        req.params.id, 
        {
            estado: req.body.estado
        },
        { new: true }
    );

    if (!orden) {
        return res.status(400).send('La orden no existe');
    }
    
    res.send(orden);
});

router.delete('/:id', async (req, res) => {
    try {
        const orden = await Orden.findByIdAndRemove(req.params.id);
        
        if (!orden) {
            return res.status(404).json({ success: false, message: 'La orden no existe' });
        }
        
        await Promise.all(orden.ordenProductos.map(async (ordenProducto) => {
            await OrdenProducto.findByIdAndRemove(ordenProducto);
        }));
        
        return res.status(200).json({ success: true, message: 'La orden se ha eliminado' });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
});

router.delete('/:id/productos/:productoId', async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id);

        if (!orden) {
            return res.status(404).json({ success: false, message: 'La orden no existe' });
        }

        const producto = await OrdenProducto.findById(req.params.productoId);

        if (!producto) {
            return res.status(404).json({ success: false, message: 'El producto no existe' });
        }

        orden.ordenProductos = orden.ordenProductos.filter((ordenProducto) => ordenProducto.id !== producto.id);

        await orden.save();

        return res.status(200).json({ success: true, message: 'El producto se ha eliminado' });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
});


module.exports = router;
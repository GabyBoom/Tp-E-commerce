const {Orden} = require('../models/producto');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const ordenLista = await Orden.find();

    if(!ordenLista) {
        res.status(500).json({success: false});
    }
    res.send(ordenLista);
});

module.exports = router;
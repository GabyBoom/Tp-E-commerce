const {Usuario} = require('../models/producto');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const usuarioLista = await Usuario.find();

    if(!usuarioLista) {
        res.status(500).json({success: false});
    }
    res.send(usuarioLista);
});

module.exports = router;
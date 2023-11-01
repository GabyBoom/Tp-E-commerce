const {Categoria} = require('../models/categoria');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const categoriaLista = await Categoria.find();

    if(!categoriaLista) {
        res.status(500).json({success: false});
    }
    res.send(categoriaLista);
});

router.post('/', async (req, res) => {
    let categoria = new Categoria({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    categoria = await categoria.save();

    if(!categoria) 
    return res.status(404).send('La categoria no puede ser creada');

    res.send(categoria);
})

router.delete('/:id', (req, res) => {
    Categoria.findByIdAndRemove(req.params.id).then(categoria => {
        if(categoria) {
            return res.status(200).json({success: true, message: 'La categoria se ha eliminado'})
        } else {
            return res.status(404).json({success: false, message: 'La categoria no existe'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;
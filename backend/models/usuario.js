const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

exports.Usuario = mongoose.model('Usuario', usuarioSchema);
const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Producto = mongoose.model('Producto', productoSchema);


exports.Producto = mongoose.model('Producto', productoSchema);
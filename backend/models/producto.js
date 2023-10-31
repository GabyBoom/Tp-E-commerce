const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Producto = mongoose.model('Producto', productoSchema);


exports.Producto = mongoose.model('Producto', productoSchema);
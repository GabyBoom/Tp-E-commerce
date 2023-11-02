const mongoose = require('mongoose');

const ordenProductoSchema = mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }
})

exports.OrdenProducto = mongoose.model('OrdenProducto', ordenProductoSchema);
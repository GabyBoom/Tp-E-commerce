const mongoose = require('mongoose');

const ordenSchema = mongoose.Schema({
    ordenProductos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrdenProducto',
        required: true
    }],
    direccionEnvio: {
        type: String,
        required: true,
    },
    direccionEnvio2: {
        type: String,
    },
    ciudad: {
        type: String,
        required: true,
    },
    codigoPostal: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
    celular: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        default: 'pendiente',
    },
    precioTotal: {
        type: Number,
    },
    fechaOrden: {
        type: Date,
        default: Date.now
    }
});

ordenSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

ordenSchema.set('toJSON', {
    virtuals: true
});

exports.Orden = mongoose.model('Orden', ordenSchema)
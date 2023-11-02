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
        ref: 'Categoria',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})
productoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

productoSchema.set('toJSON', {
    virtuals: true
});

const Producto = mongoose.model('Producto', productoSchema);


exports.Producto = mongoose.model('Producto', productoSchema);
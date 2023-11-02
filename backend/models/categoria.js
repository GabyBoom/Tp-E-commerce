const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: { 
        type: String,
    }
})
categoriaSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

categoriaSchema.set('toJSON', {
    virtuals: true
});


exports.Categoria = mongoose.model('Categoria', categoriaSchema);
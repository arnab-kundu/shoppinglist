const mongoose = require('mongoose');

const ShoppingItemSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    itemBrought: {
        type: Boolean,
        required: true
    }
});


const item = module.exports = mongoose.model('Item', ShoppingItemSchema);
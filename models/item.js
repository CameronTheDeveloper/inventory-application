const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true, maxLength: 300},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    price: {
        type: Number, 
        required: true,
        min: 0.01,
        max: 1000000
    }
});

module.exports = mongoose.model("Item", ItemSchema);
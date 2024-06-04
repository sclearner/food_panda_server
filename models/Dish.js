const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
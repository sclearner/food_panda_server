const mongoose = require('mongoose');
const Dish = require('./Dish');

const menuSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    reviewStar: Number,
    reviewCount: Number,
    openTime: Date,
    closeTime: Date,
    contact: String,
    gallery: [String],
    latitude: Number,
    longitude: Number,
    description: String,
    dishes: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Dish'}],
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
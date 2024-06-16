const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    idNo: {type: String, required: true},
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    collection: { type: String, required: true } // To store the collection name
});

module.exports = mongoose.model('Image', imageSchema);

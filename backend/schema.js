const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
})

module.exports = mongoose.model("taskManager", detailSchema);
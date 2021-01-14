const mongoose = require('mongoose')

const shirtSchema = new mongoose.Schema({
  band: { type: String, required: true },
  size: { type: String, required: true },
  color: String,
  image: String
})
const Shirt = mongoose.model('Shirt', shirtSchema)

module.exports = Shirt

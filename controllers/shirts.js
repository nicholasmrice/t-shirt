const express = require('express')
const shirts = express.Router()

const Shirt = require('../models/tshirt.js')

shirts.post('/', (req, res) => {
  Shirt.create(req.body, (err, createdShirt) => {
    Shirt.find({}, (err, foundShirts) => {
      res.json(foundShirts)
    })
  })
})

shirts.get('/', (req, res) => {
  Shirt.find({}, (err, Shirts) => {
    res.json(foundShirts)
  })
})

shirts.put('/:id', (req, res) => {
  Shirt.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedShirt) => {
      if (err) {
        res.send(err)
     } else {
       Shirt.find({}, (err, foundShirts) => {
         res.json(foundShirts)
       })
     }
    }
  )
})

shirts.delete('/:id', (req, res) => {
  Shirt.findByIdAndRemove(req.params.id, (err, deletedShirt) => {
    Shirt.find({}, (err, foundShirts) => {
      res.json(foundShirts)
    })
  })
})

module.exports = shirts

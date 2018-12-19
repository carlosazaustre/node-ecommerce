'use strict'

const express = require('express')

const router = express.Router()

const products = [
  {
    name: 'Red shoes',
    price: 75,
    image: 'https://images.unsplash.com/photo-1458203867847-adde81e793ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Black Bike',
    price: 300,
    image: 'https://images.unsplash.com/photo-1529929353612-a4320ffeba41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  }
]

router.get('/', function (req, res) {
  res.render('products', { products })
})

module.exports = router

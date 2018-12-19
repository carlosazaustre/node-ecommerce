'use strict'

const express = require('express')

const router = express.Router()

router.get('/', function (req, res) {
  //res.render('products', { products })
  res.status(200)
})

module.exports = router

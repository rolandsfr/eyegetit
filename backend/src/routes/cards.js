const express = require('express')
const router = express.Router()
const cards = require('../services/cards')

router.get('/', (req, res) => {
    res.json({status:'ok'})
})

router.get('/list', (req, res) => {
    cards.getAll().then((rows) => {
        res.json({words: rows})
    }).catch((err) => {
        res.json({error: err})
    })
})

module.exports = router
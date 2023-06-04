const express = require('express')
const router = express.Router()
const cards = require('../services/cards')

router.get('/', (req, res) => {
    res.json({status:'ok'})
})

router.get('/list', (req, res) => {
    const category = req.query.cat
    if (category) {
        cards.getAllForCategory(category).then((rows) => {
            res.json({words: rows})
        }).catch((err) => {
            res.json({error: err})
        })
        return
    }


    cards.getAll().then((rows) => {
        res.json({words: rows})
    }).catch((err) => {
        res.json({error: err})
    })
})

router.get('/categories', (req, res) => {
    const catQuery = cards.getCategories()
    const catCountQuery = cards.getCategoriesCount()

    Promise.all([catQuery, catCountQuery]).then((values) => {
        res.json({categories: values[0], total: values[1][0].total})
    }).catch((err) => {
        res.json({error: err})
    })
});

module.exports = router
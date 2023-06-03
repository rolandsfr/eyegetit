const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({status:'ok'})
})

router.get('/list', (req, res) => {
    const words = [{card: 'hello', image: ""}]
    res.json({words: words})
})

module.exports = router
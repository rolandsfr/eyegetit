const express = require('express');
const router = express.Router();

router.put('/', (req, res) => {
    const {input_text} = req.body;
    console.log('input_text:', input_text);

    res.json({
        status: 'ok',
        prompt: input_text,
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { PrepareImageUrl } = require('../helper/image_url');

const { sendMessage } = require('../services/chatgpt');

router.put('/', async (req, res) => {
    const { input_text } = req.body;
    if (!input_text) {
        return res.json({status: 'error', message: 'input_text is required'})
    }

    console.log('input_text:', input_text);
    // TODO: Add validation
    const data = await sendMessage(input_text)


    data.forEach((item) => {
        item.image = PrepareImageUrl(item.card)
    })
    res.json({
        status: 'ok',
        prompt: input_text,
        data: data
    });
});

module.exports = router;
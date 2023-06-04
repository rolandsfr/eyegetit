const express = require('express');
const router = express.Router();
const { PrepareImageUrl, ValidateImageUrl} = require('../helper/image_url');

const { sendMessage } = require('../services/chatgpt');

router.put('/', async (req, res) => {
    const { input_text } = req.body;
    if (!input_text) {
        return res.json({status: 'error', message: 'input_text is required'})
    }
    console.log('input_text:', input_text);
    const data = await sendMessage(input_text)
    console.log('data:', data)

    data.forEach((item) => {
        item.image = PrepareImageUrl(item.card)
    })

    const validated = []
    data.forEach((item) => {
        if (item.image) {
            validated.push(ValidateImageUrl(item.image).then((url) => {
                item.image = url
            }))
        }
    })

    await Promise.all(validated)

    res.json({
        status: 'ok',
        prompt: input_text,
        data: data
    });
});

module.exports = router;
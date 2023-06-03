const axios = require('axios')
const {log} = require('debug')

const API_KEY = process.env.API_KEY
const API_URL = process.env.API_URL


async function sendMessage(message) {
    try {
        const response = await axios.post(API_URL, {
            max_tokens: 150, // Adjust the max tokens based on your desired response length
            temperature: 0.6, // Adjust the temperature to control the randomness of the response
            n: 1, // Number of responses to generate
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system", content: "You are only responding in plain JSON"
            }, {
                role: "user", content: `All my subsequent messages will be sentences that I'd like you to convert to an array of PECS cards. Please use a single word to represent each card. Only take meaningful words. Please make any extra qualifiers for each meaningful word as an extra property called qualifiers. Examples:
"I'm going to a big city with a red car" should produce: "I", "go", "to", "city" ("big"), "with", "car" ("red").
"The quick brown fox jumps over the lazy dog": "fox" ("quick", "brown"), "jump" ("over"), "dog" ("lazy")
"To kill two small birds with one big stone": "kill", "two", "birds" ("small"), "with", "one", "stone" ("big").
Mistakes for you not to repeat: "Would you like to go there by red car or yellow bus?" should not produce "car" ("red", "yellow"), but produce "car" ("red").
All responses should be in JSON in the following format:
[
  {
    "card": "car",
    "qualifiers": ["red"]
  }
]`
            }, {
                role: "assistant",
                content: "I'm happy to help! Please provide me with the sentence you'd like me to convert to an array of PECS cards."
            }, {role: "user", content: message},
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json',
            },
        });
        const {choices} = response.data;
        const reply = choices[0].message.content;
        return JSON.parse(reply);
    } catch (error) {
        console.error('Error:', error.response.data)
        throw error;
    }
}


module.exports = {
    sendMessage,
}
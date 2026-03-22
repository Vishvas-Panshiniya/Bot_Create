require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to receive Telegram messages
app.post('/api/data', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || !message.text) {
            return res.status(400).json({ error: 'No message text provided' });
        }

        const chatId = message.chat.id;
        const userText = message.text;

        console.log(`Received message from ${chatId}: ${userText}`);

        // 1. Call Groq API
        const groqResponse = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.1-8b-instant',
                messages: [{ role: 'user', content: userText }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiReply = groqResponse.data.choices[0].message.content;
        console.log(`AI Reply: ${aiReply}`);

        // 2. Send reply back to Telegram
        if (process.env.TELEGRAM_BOT_TOKEN) {
            await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: chatId,
                text: aiReply
            });
        }

        res.json({
            status: 'success',
            reply: aiReply
        });

    } catch (error) {
        console.error('Error processing request:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

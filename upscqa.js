// Backend - Node.js with Express
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.post('/api/process-gpt', async (req, res) => {
    try {
        const formData = req.body;
        
        // Format the prompt
        const prompt = `
            User Information:
            Name: ${formData.name}
            Email: ${formData.email}
            Category: ${formData.category}
            Message: ${formData.message}
        `;
        
        // Make request to OpenAI
        const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{
                role: "user",
                content: prompt
            }],
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ response: openaiResponse.data.choices[0].message.content });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
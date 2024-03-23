const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = 3000;

// Configure a chave da API do OpenAI
const openai = new OpenAI('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');

app.use(bodyParser.json());

app.post('/ask', (req, res) => {
    const { question } = req.body;

    openai.completions.create({
        engine: 'davinci-codex', // Escolha o mecanismo adequado, dependendo das suas necessidades
        prompt: question,
        max_tokens: 150,
        n: 1,
        stop: ['\n']
    })
    .then(response => {
        const answer = response.data.choices[0].text.trim();
        res.json({ answer });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua pergunta.' });
    });
});

app.listen(port, () => {
    console.log(`Server running at https://lucasftomaz.com.br:${port}`);
});
    

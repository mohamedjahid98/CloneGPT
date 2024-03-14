const PORT = 8000
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const API_KEY = '' //Api key for your open AI

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: req.body.message }],
            model: "gpt-3.5-turbo",
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Server is Running ' + PORT))
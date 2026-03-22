const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.post("/api/data", async (req, res) => {
  const data = req.body;

  const chatId = data?.message?.chat?.id;
  const text = data?.message?.text;

  if (!chatId || !text) {
    return res.status(200).json({
      message: "Data received successfully!",
    });
  }

  try {
    const groqResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `reply for this question: ${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const reply = groqResponse.data.choices[0].message.content;

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: reply,
      },
    );

    res.status(200).json({
      message: "Data received and send successfully!",
      reply: reply,
    });
  } catch (error) {
    console.error(
      "Error calling API:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).json({
      message: "Error processing request with API",
      error: error.message,
    });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Simple Express API!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

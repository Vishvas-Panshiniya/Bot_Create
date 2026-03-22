# Bot_Create

A Telegram bot powered by **Groq AI** that provides automated, intelligent responses. This project uses an Express.js server to handle Telegram webhooks and communicates with the Groq API for high-performance LLM chat completions.

## 🚀 Features

- **Express.js API**: Robust backend for receiving and processing Telegram webhook data.
- **Groq AI Integration**: Uses the `llama-3.1-8b-instant` model for fast and accurate chat completions.
- **Automated Replies**: Seamlessly sends AI-generated responses back to users on Telegram.
- **Environment Configuration**: Secure management of API keys and server settings using `dotenv`.

## 🛠️ Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- A **Telegram Bot Token** (obtainable from [BotFather](https://t.me/botfather))
- A **Groq API Key** (obtainable from the [Groq Console](https://console.groq.com/))

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Bot_Create
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (or update the existing one) with the following content:
   ```env
   PORT=3000
   GROQ_API_KEY=your_groq_api_key_here
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   ```

## 🎮 Usage

1. **Start the server:**
   ```bash
   node index.js
   ```
   The server will start on the port specified in your `.env` file (default: 3000).

2. **Set up Telegram Webhook:**
   Configure your bot's webhook to point to your server's endpoint:
   `https://your-domain.com/api/data`

3. **Test the API:**
   You can use the included `test_api.js` script to verify the server logic without calling Telegram:
   ```bash
   node test_api.js
   ```

## 📂 Project Structure

- `index.js`: Main application entry point and Express server.
- `test_api.js`: Script for local API verification.
- `.env`: Environment configuration file (ignored by git).
- `package.json`: Project dependencies and scripts.

## 📄 License

This project is licensed under the ISC License.

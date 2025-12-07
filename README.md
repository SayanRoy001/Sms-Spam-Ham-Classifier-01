# 🛡️ SMS Spam Classifier (SpamGuard AI)

> *Because nobody likes waking up to "You've won a lottery!" texts.*

## 👋 Overview

Welcome to **SpamGuard AI**, a smart application designed to filter out the noise from your digital life. This project uses Deep Learning to analyze SMS messages in real-time and determine whether they are legitimate conversations ("Ham") or annoying spam.

Built with a modern React frontend and a robust Flask backend powered by TensorFlow, this tool isn't just a classifier—it's a demonstration of how NLP (Natural Language Processing) can solve everyday annoyances.

## 🚀 Live Demo

- **Frontend (Vercel):** [Add your Vercel Link Here]
- **Backend (Hugging Face):** [Add your Hugging Face Space Link Here]

## ✨ Key Features

- **Real-time Analysis:** Get instant feedback on whether a message is safe or spam.
- **Smart Explanations:** See exactly *why* a message was flagged (e.g., words like "free", "urgent", "winner").
- **History Tracking:** Keep a log of your recent checks locally.
- **Dark/Light Mode:** Because we care about your eyes.
- **Responsive Design:** Works smoothly on desktop and mobile.

## 🛠️ Tech Stack

### Frontend 🎨
- **React 19** with **TypeScript**
- **Vite** for lightning-fast builds
- **Tailwind CSS** for styling
- **Lucide React** for beautiful icons

### Backend 🧠
- **Python & Flask**
- **TensorFlow / Keras** (Deep Learning Model)
- **NLTK** (Natural Language Toolkit) for text preprocessing
- **Docker** for containerization

### Machine Learning 🤖
- Trained on the **SMS Spam Collection Dataset**.
- Uses **Text Preprocessing**: Tokenization, Stemming, and Stopword removal.
- **Model Architecture**: Neural Network trained to detect spam patterns.

## 🏃‍♂️ Getting Started Locally

Want to run this on your machine? Follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/SayanRoy001/Sms-Spam-Classifier.git
cd Sms-Spam-Classifier
```

### 2. Set up the Backend
Navigate to the backend folder and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```
Run the Flask server:
```bash
python server.py
```
*The backend will start on `http://localhost:5000`.*

### 3. Set up the Frontend
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```
*The frontend will start on `http://localhost:5173`.*

## 🧠 How It Works

1.  **Input:** You type a message.
2.  **Preprocessing:** The app cleans the text (removes punctuation, converts to lowercase, stems words).
3.  **Vectorization:** The text is converted into a sequence of numbers using a trained tokenizer.
4.  **Prediction:** The Deep Learning model analyzes the sequence and outputs a probability score.
5.  **Result:** You get a "Spam" or "Ham" label with a confidence score!

## 🤝 Contributing

Got an idea to make it better? Feel free to fork the repo and submit a Pull Request. All contributions are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Made with ❤️ by Sayan Roy*

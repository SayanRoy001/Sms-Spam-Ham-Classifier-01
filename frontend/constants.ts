import { PredictionResult } from './types';

export const APP_NAME = "SpamGuard AI";
export const API_URL = "https://api.example.com/api/predict"; // Placeholder, normally env var

export const SAMPLE_MESSAGES = [
  { text: "Congratulations! You've won a $1000 Walmart gift card. Go to http://bit.ly/12345 to claim now.", type: 'spam' },
  { text: "Hey mom, I'll be home for dinner around 6pm. Love you!", type: 'ham' },
  { text: "URGENT! Your mobile number has been awarded with a £2000 prize GUARANTEED. Call 09061790121 from land line.", type: 'spam' },
  { text: "Are we still on for the meeting tomorrow at 10?", type: 'ham' },
];

export const MOCK_HISTORY: PredictionResult[] = [
  {
    id: '1',
    label: 'spam',
    probability: 0.98,
    explanation: [{ token: 'won', score: 0.8 }, { token: 'gift', score: 0.6 }],
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    originalText: "You have won a gift card!",
  },
  {
    id: '2',
    label: 'ham',
    probability: 0.02,
    explanation: [{ token: 'home', score: 0.1 }, { token: 'dinner', score: 0.05 }],
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    originalText: "Coming home for dinner.",
  }
];

export const MODEL_INFO = {
  name: "LSTM_Spam_Detector_v2.h5",
  version: "2.1.0",
  type: "Keras/TensorFlow",
  dataset: "SMS Spam Collection (UCI)",
  balanceMethod: "SMOTE (Synthetic Minority Over-sampling Technique)",
  accuracy: "98.4%",
};
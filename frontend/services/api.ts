import { PredictionResult, ApiError } from '../types';

// Simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock prediction for fallback
const mockPredict = async (text: string): Promise<PredictionResult> => {
  await delay(1200);

  const lowerText = text.toLowerCase();
  const spamKeywords = ['win', 'winner', 'free', 'prize', 'urgent', 'cash', 'claim', 'guaranteed', 'offer'];
  
  let spamScore = 0;
  const explanation = [];

  const words = text.split(/\s+/);
  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    if (spamKeywords.includes(cleanWord)) {
      spamScore += 0.2;
      explanation.push({ token: word, score: 0.8 + Math.random() * 0.2 });
    } else {
       explanation.push({ token: word, score: Math.random() * 0.1 });
    }
  }

  const probability = Math.min(0.99, Math.max(0.01, spamScore + (Math.random() * 0.1)));
  const label = probability > 0.5 ? 'spam' : 'ham';

  return {
    id: crypto.randomUUID(),
    label,
    probability,
    explanation,
    timestamp: new Date().toISOString(),
    originalText: text
  };
};

export const predictMessage = async (text: string, useMock: boolean = false): Promise<PredictionResult> => {
  if (useMock) {
    return mockPredict(text);
  }

  try {
    // Use env variable or default to proxy
    const baseUrl = import.meta.env.VITE_API_URL || '';
    const response = await fetch(`${baseUrl}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return {
      ...data,
      id: crypto.randomUUID(),
      originalText: text,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn("API unreachable, falling back to mock logic for demo.", error);
    return mockPredict(text);
  }
};

export type Label = 'spam' | 'ham';

export interface TokenExplanation {
  token: string;
  score: number; // -1 to 1 (negative indicates ham, positive indicates spam usually, or magnitude based)
}

export interface PredictionResult {
  label: Label;
  probability: number; // 0.0 to 1.0
  explanation: TokenExplanation[];
  timestamp: string;
  originalText: string;
  id: string; // unique ID for history
}

export interface HistoryItem extends PredictionResult {}

export interface ApiError {
  message: string;
  code?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface ModelInfo {
  name: string;
  version: string;
  lastUpdated: string;
  accuracy: string;
}
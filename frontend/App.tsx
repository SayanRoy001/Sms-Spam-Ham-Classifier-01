import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputCard from './components/InputCard';
import PredictionCard from './components/PredictionCard';
import HistoryPanel from './components/HistoryPanel';
import Modal from './components/Modal';
import { MODEL_INFO } from './constants';
import { predictMessage } from './services/api';
import { PredictionResult, HistoryItem, ThemeMode } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Initialize theme
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('spamguard_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Update theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('spamguard_theme', theme);
  }, [theme]);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem('spamguard_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem('spamguard_history', JSON.stringify(history));
  }, [history]);

  const handlePredict = async (text: string) => {
    setLoading(true);
    setCurrentPrediction(null);
    try {
      const result = await predictMessage(text);
      setCurrentPrediction(result);
      setHistory(prev => [result, ...prev]);
    } catch (error) {
      console.error(error);
      alert("Failed to predict. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setCurrentPrediction(item);
    setIsHistoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col font-sans transition-colors duration-300">
      <Header 
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)} 
        onOpenAbout={() => setIsAboutOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl relative">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight transition-colors">
            Verify SMS messages instantly.
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-lg transition-colors">
            Use our AI-powered engine to detect spam, phishing, and malicious text messages with token-level transparency.
          </p>
        </div>

        <InputCard onPredict={handlePredict} isLoading={loading} />

        {currentPrediction && (
          <PredictionCard 
            result={currentPrediction} 
            onSave={() => {}} 
          />
        )}
      </main>

      <footer className="py-6 text-center text-sm text-neutral-400 dark:text-neutral-500 border-t border-neutral-100 dark:border-neutral-800 mt-12 bg-white dark:bg-neutral-900 transition-colors">
        <p>&copy; {new Date().getFullYear()} SpamGuard AI. Open Source Project.</p>
      </footer>

      <HistoryPanel 
        history={history}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelect={handleHistorySelect}
        onClear={() => setHistory([])}
      />

      <Modal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
        title="Model Information"
      >
        <div className="space-y-4">
          <div className="p-4 bg-primary-DEFAULT/5 dark:bg-primary-DEFAULT/10 rounded-lg border border-primary-DEFAULT/10 dark:border-primary-DEFAULT/20">
             <h4 className="font-semibold text-primary-dark dark:text-primary-variant mb-2">Current Model</h4>
             <ul className="text-sm space-y-2 text-neutral-700 dark:text-neutral-300">
               <li><span className="font-semibold">Name:</span> {MODEL_INFO.name}</li>
               <li><span className="font-semibold">Framework:</span> {MODEL_INFO.type}</li>
               <li><span className="font-semibold">Version:</span> {MODEL_INFO.version}</li>
               <li><span className="font-semibold">Accuracy:</span> {MODEL_INFO.accuracy} on test set</li>
             </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-white mb-2">Training Data</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Trained on the <strong>UCI SMS Spam Collection</strong>, balanced using <strong>{MODEL_INFO.balanceMethod}</strong> to prevent bias towards 'ham' (legitimate) messages.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-white mb-2">Explainability</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We use a custom implementation of LIME/SHAP principles to score individual tokens. Positive scores contribute to the Spam classification, while negative or near-zero scores indicate neutral or Ham features.
            </p>
          </div>
          
          <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-end">
            <a href="#" className="text-sm text-primary-DEFAULT hover:underline font-medium">View Training Notebook &rarr;</a>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;

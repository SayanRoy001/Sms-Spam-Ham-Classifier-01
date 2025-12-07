import React from 'react';
import { TokenExplanation } from '../types';

interface TokenHighlighterProps {
  explanation: TokenExplanation[];
}

// Maps a score (0-1) to a background color intensity
const getBgColor = (score: number, isSpamIndicator: boolean) => {
  // If score is high and indicates spam, use red/orange.
  // If we just want to highlight "importance", we can use blue.
  // Assuming 'score' is contribution to the predicted class.
  // We'll use a simple threshold approach for the demo.
  
  if (score < 0.1) return 'bg-transparent';
  
  // Opacity levels - adjusted for dark mode using alpha
  // In tailwind, we can use standard classes, relying on opacity utilities
  if (score < 0.3) return 'bg-primary-DEFAULT/10 dark:bg-primary-DEFAULT/20';
  if (score < 0.6) return 'bg-primary-DEFAULT/30 dark:bg-primary-DEFAULT/40';
  return 'bg-primary-DEFAULT/50 dark:bg-primary-DEFAULT/60';
};

const TokenHighlighter: React.FC<TokenHighlighterProps> = ({ explanation }) => {
  return (
    <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 leading-relaxed text-neutral-800 dark:text-neutral-200 break-words transition-colors">
      {explanation.map((item, idx) => (
        <span
          key={idx}
          className={`inline-block px-0.5 mx-0.5 rounded transition-colors duration-300 ${getBgColor(item.score, true)}`}
          title={`Score: ${item.score.toFixed(3)}`}
        >
          {item.token}
        </span>
      ))}
    </div>
  );
};

export default TokenHighlighter;
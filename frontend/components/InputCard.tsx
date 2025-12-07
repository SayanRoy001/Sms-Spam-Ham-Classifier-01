import React, { useState } from 'react';
import { SendIcon, TrashIcon } from './Icons';
import { SAMPLE_MESSAGES } from '../constants';

interface InputCardProps {
  onPredict: (text: string) => void;
  isLoading: boolean;
}

const InputCard: React.FC<InputCardProps> = ({ onPredict, isLoading }) => {
  const [text, setText] = useState("");
  const charCount = text.length;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() && !isLoading) {
      onPredict(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText((event.target?.result as string) || "");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6 border border-neutral-100 dark:border-neutral-700 mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Analyze Message</h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-md transition-colors">
           {charCount} chars
        </span>
      </div>

      <div className="relative mb-4">
        <textarea
          className="w-full min-h-[140px] p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent outline-none resize-y transition-all text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500"
          placeholder="Type or paste the SMS message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {/* Helper text chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-neutral-400 dark:text-neutral-500 uppercase font-bold tracking-wider mr-2 self-center">Try Sample:</span>
          {SAMPLE_MESSAGES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setText(sample.text)}
              className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:border-primary-DEFAULT hover:text-primary-DEFAULT dark:hover:border-primary-variant dark:hover:text-primary-variant transition-colors"
            >
              {sample.type === 'spam' ? '🚨 Spam Ex' : '✅ Ham Ex'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-neutral-100 dark:border-neutral-700 pt-5">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="cursor-pointer text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-DEFAULT dark:hover:text-primary-variant transition-colors flex items-center gap-1">
             <span className="underline decoration-dotted">Upload .txt</span>
             <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => setText("")}
            className="p-2 text-neutral-400 dark:text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            aria-label="Clear text"
            disabled={!text || isLoading}
          >
            <TrashIcon />
          </button>
          <button
            onClick={() => handleSubmit()}
            disabled={!text.trim() || isLoading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all shadow-md transform active:scale-95
              ${!text.trim() || isLoading ? 'bg-neutral-300 dark:bg-neutral-600 cursor-not-allowed shadow-none' : 'bg-primary-DEFAULT hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5'}
            `}
          >
            {isLoading ? (
               <><span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full block"></span> Analyzing...</>
            ) : (
               <><SendIcon /> Detect Spam</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputCard;
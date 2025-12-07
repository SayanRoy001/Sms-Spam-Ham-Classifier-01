import React from 'react';
import { HistoryItem } from '../types';
import { TrashIcon, RefreshIcon, CloseIcon } from './Icons';

interface HistoryPanelProps {
  history: HistoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, isOpen, onClose, onSelect, onClear }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-neutral-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/50">
            <h3 className="font-bold text-lg text-neutral-800 dark:text-white">History</h3>
            <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-10 text-neutral-400 dark:text-neutral-500">
                <p>No history yet.</p>
                <p className="text-xs mt-1">Predictions will appear here.</p>
              </div>
            ) : (
              history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="group p-3 rounded-lg border border-neutral-100 dark:border-neutral-700 hover:border-primary-DEFAULT hover:shadow-md transition-all cursor-pointer bg-white dark:bg-neutral-800 dark:hover:border-primary-variant"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${item.label === 'spam' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-2 font-medium">
                    {item.originalText}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
                     <span>Prob: {(item.probability * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
            <button 
              onClick={onClear}
              disabled={history.length === 0}
              className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrashIcon className="w-4 h-4" />
              Clear History
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPanel;
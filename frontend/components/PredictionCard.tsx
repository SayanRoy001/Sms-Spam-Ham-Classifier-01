import React, { useState } from 'react';
import { PredictionResult } from '../types';
import TokenHighlighter from './TokenHighlighter';
import { CheckIcon, InfoIcon } from './Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PredictionCardProps {
  result: PredictionResult;
  onSave: (result: PredictionResult) => void;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ result, onSave }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const isSpam = result.label === 'spam';
  const confidencePercent = Math.round(result.probability * 100);
  
  // Sort explanation for chart
  const topFeatures = [...result.explanation]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const themeColor = isSpam ? '#EF4444' : '#10B981'; // Red for spam, Green for ham

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-100 dark:border-neutral-700 overflow-hidden animate-fade-in-up transition-colors">
      {/* Header Result */}
      <div className={`p-6 border-b ${isSpam ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30'} transition-colors`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm ${isSpam ? 'bg-red-100 dark:bg-red-800/40 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-800/40 text-emerald-600 dark:text-emerald-400'}`}>
              {isSpam ? '🚨' : '🛡️'}
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">Result</h3>
              <div className="flex items-baseline gap-3">
                 <span className={`text-3xl font-bold ${isSpam ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                   {isSpam ? 'SPAM DETECTED' : 'NOT SPAM'}
                 </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end min-w-[140px]">
             <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase">Confidence</span>
             <span className="text-3xl font-bold text-neutral-800 dark:text-white">{confidencePercent}%</span>
             <div className="w-full h-2 bg-white dark:bg-neutral-700 rounded-full mt-2 overflow-hidden border border-neutral-200 dark:border-neutral-600">
               <div 
                 className={`h-full ${isSpam ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-emerald-400 to-emerald-600'}`} 
                 style={{ width: `${confidencePercent}%` }}
               />
             </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-end px-6 py-2 border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 gap-2 transition-colors">
         <button onClick={() => onSave(result)} className="text-xs font-medium text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-variant px-3 py-1 rounded hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-600 transition-all">
            Save to History
         </button>
         <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))} className="text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 px-3 py-1 rounded hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-600 transition-all">
            Copy JSON
         </button>
      </div>

      {/* Explanation Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Highlighter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-neutral-800 dark:text-white">Token Analysis</h4>
              <div className="group relative">
                <InfoIcon className="w-4 h-4 text-neutral-400 cursor-help" />
                <div className="absolute left-0 bottom-6 hidden group-hover:block w-48 p-2 bg-neutral-800 dark:bg-neutral-900 border dark:border-neutral-700 text-white text-xs rounded z-10">
                  Darker highlights indicate tokens that contributed more to the decision.
                </div>
              </div>
            </div>
            <TokenHighlighter explanation={result.explanation} />
          </div>

          {/* Chart */}
          <div>
             <div className="flex items-center justify-between mb-3">
               <h4 className="font-semibold text-neutral-800 dark:text-white">Top Contributors</h4>
               <button 
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-xs text-primary-DEFAULT hover:underline"
                >
                  {showExplanation ? 'Hide Graph' : 'Show Graph'}
                </button>
             </div>
             
             {showExplanation && (
               <div className="h-[200px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={topFeatures} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="token" type="category" width={80} tick={{fontSize: 12, fill: '#94A3B8'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#1E293B', color: '#fff' }}
                        cursor={{fill: 'transparent'}}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                        {topFeatures.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={themeColor} fillOpacity={0.6 + (index * 0.1)} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
             )}
             {!showExplanation && (
               <ul className="space-y-2">
                 {topFeatures.map((feat, idx) => (
                   <li key={idx} className="flex justify-between items-center text-sm p-2 bg-neutral-50 dark:bg-neutral-900 rounded border border-transparent dark:border-neutral-700">
                     <span className="font-medium text-neutral-700 dark:text-neutral-300">{feat.token}</span>
                     <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                           <div className="h-full" style={{ width: `${Math.min(feat.score * 100, 100)}%`, backgroundColor: themeColor }}></div>
                        </div>
                        <span className="text-neutral-500 dark:text-neutral-400 font-mono text-xs">{(feat.score).toFixed(2)}</span>
                     </div>
                   </li>
                 ))}
               </ul>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
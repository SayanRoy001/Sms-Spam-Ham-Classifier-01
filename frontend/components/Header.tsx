import React from 'react';
import { LogoIcon, MenuIcon, SunIcon, MoonIcon } from './Icons';
import { APP_NAME } from '../constants';
import { ThemeMode } from '../types';

interface HeaderProps {
  onToggleHistory: () => void;
  onOpenAbout: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleHistory, onOpenAbout, theme, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-700 h-16 flex items-center transition-colors">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-DEFAULT rounded-lg flex items-center justify-center text-white shadow-glow">
            <LogoIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">{APP_NAME}</h1>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wider hidden sm:block">Intelligent SMS Filtering</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {/* Theme Toggle */}
           <button 
             onClick={onToggleTheme}
             className="p-2 rounded-full text-neutral-500 hover:text-primary-DEFAULT dark:text-neutral-400 dark:hover:text-primary-DEFAULT hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all"
             aria-label="Toggle theme"
           >
             {theme === 'light' ? <MoonIcon /> : <SunIcon />}
           </button>

           <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-600 hidden sm:block"></div>
           
           <button 
             onClick={onOpenAbout}
             className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors hidden sm:block"
           >
             Model Info
           </button>
           
           <button
             onClick={onToggleHistory}
             className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-600 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary-DEFAULT hover:text-primary-DEFAULT transition-all"
           >
             <span className="hidden sm:inline">History</span>
             <MenuIcon className="w-5 h-5" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
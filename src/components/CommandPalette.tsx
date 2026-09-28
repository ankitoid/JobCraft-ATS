'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Target,
  FileText,
  Briefcase,
  Sparkles,
  Command,
  ArrowRight,
  Zap,
  Printer,
  Compass,
  CornerDownLeft,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: 'ats' | 'builder' | 'tracker' | 'polisher' | 'intelligence') => void;
  onTriggerScan: () => void;
  onPrintResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Tools';
  icon: any;
  action: () => void;
  keywords?: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerScan,
  onPrintResume,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: 'nav-ats',
      title: 'Go to ATS Matcher & Scanner',
      category: 'Navigation',
      icon: Target,
      action: () => { onNavigate('ats'); onClose(); },
      keywords: ['ats', 'score', 'match', 'keywords', 'scan']
    },
    {
      id: 'nav-builder',
      title: 'Go to Resume Builder & Live Preview',
      category: 'Navigation',
      icon: FileText,
      action: () => { onNavigate('builder'); onClose(); },
      keywords: ['resume', 'builder', 'editor', 'experience', 'skills']
    },
    {
      id: 'nav-tracker',
      title: 'Go to Job Application Pipeline (Kanban)',
      category: 'Navigation',
      icon: Briefcase,
      action: () => { onNavigate('tracker'); onClose(); },
      keywords: ['jobs', 'tracker', 'kanban', 'applications', 'interviews']
    },
    {
      id: 'nav-intelligence',
      title: 'Go to JD Intelligence & Interview Prep',
      category: 'Navigation',
      icon: Compass,
      action: () => { onNavigate('intelligence'); onClose(); },
      keywords: ['jd', 'intelligence', 'interview', 'questions', 'cover letter', 'analysis']
    },
    {
      id: 'nav-polisher',
      title: 'Go to Google XYZ Bullet Polisher',
      category: 'Navigation',
      icon: Sparkles,
      action: () => { onNavigate('polisher'); onClose(); },
      keywords: ['bullet', 'polisher', 'xyz', 'google', 'action verbs']
    },
    {
      id: 'act-scan',
      title: 'Run Instant ATS Scan & Match',
      category: 'Actions',
      icon: Zap,
      action: () => { onNavigate('ats'); onTriggerScan(); onClose(); },
      keywords: ['scan', 'run', 'analyze', 'match', 'check']
    },
    {
      id: 'act-print',
      title: 'Print / Export Resume to Vector PDF',
      category: 'Actions',
      icon: Printer,
      action: () => { onPrintResume(); onClose(); },
      keywords: ['print', 'pdf', 'download', 'export']
    }
  ];

  // Filter commands by search query
  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.keywords && cmd.keywords.some((k) => k.includes(q)))
    );
  });

  // Handle keyboard events inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Reset index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="relative border-b border-slate-800 p-3 flex items-center">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search (e.g., 'scan', 'print', 'interview', 'builder')..."
              className="w-full bg-transparent px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-500 hover:text-slate-300 transition mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No commands matching "{query}"
              </div>
            ) : (
              filtered.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition ${
                      isSelected
                        ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="block">{item.title}</span>
                        <span
                          className={`text-[10px] ${
                            isSelected ? 'text-blue-200' : 'text-slate-500'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Keyboard Hint Footer */}
          <div className="bg-slate-950/70 border-t border-slate-800/80 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">↑↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">↵</kbd>
                <span>Select</span>
              </span>
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">Esc</kbd>
                <span>Close</span>
              </span>
            </div>
            <div className="flex items-center space-x-1 text-blue-400 font-mono text-[10px]">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

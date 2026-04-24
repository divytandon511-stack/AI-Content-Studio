"use client"

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Check, Settings2, Info } from 'lucide-react';

export function BrandVoiceSettings() {
  const { brandVoice, setBrandVoice } = useStore();
  
  const [tone, setTone] = useState(brandVoice.tone);
  const [vocabulary, setVocabulary] = useState(brandVoice.vocabulary);
  const [style, setStyle] = useState(brandVoice.style);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setBrandVoice({ tone, vocabulary, style });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <Settings2 className="text-indigo-600" /> Brand Voice
        </h1>
        <p className="mt-2 text-slate-500">Define the tone, vocabulary, and style guidelines that the AI will use to generate all your content.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Primary Tone</label>
          <input 
            type="text" 
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="e.g. Professional yet approachable, authoritative but easy to understand."
          />
        </div>

        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Brand Vocabulary & Keywords</label>
           <p className="text-xs text-slate-500 mb-3 flex items-center gap-1"><Info size={14} /> Words you want the AI to naturally include.</p>
           <textarea 
            value={vocabulary}
            onChange={(e) => setVocabulary(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            placeholder="e.g. innovation, synergy, growth, user-centric, seamless"
          />
        </div>

        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Style Guidelines</label>
           <p className="text-xs text-slate-500 mb-3 flex items-center gap-1"><Info size={14} /> Formatting instructions like sentence length or paragraph usage.</p>
           <textarea 
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            placeholder="e.g. Use short paragraphs, clear headings, and bullet points where helpful. Avoid complex jargon."
          />
        </div>

        <div className="pt-4 flex justify-end items-center gap-4">
          {saved && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><Check size={16} /> Saved!</span>}
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Save Brand Voice
          </button>
        </div>
      </div>
    </div>
  );
}

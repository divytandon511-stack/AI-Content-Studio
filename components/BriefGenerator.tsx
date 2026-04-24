"use client"

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { generateContent } from '@/lib/gemini';
import { Brief, GeneratedContent } from '@/lib/types';
import { Sparkles, Loader2, Send } from 'lucide-react';

export function BriefGenerator({ onComplete }: { onComplete: () => void }) {
  const { brandVoice, addContent } = useStore();
  
  const [brief, setBrief] = useState<Brief>({ 
    topic: '', 
    audience: '', 
    tone: '', 
    goals: '' 
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!brief.topic || !brief.audience) {
      setError('Please fill in at least the topic and audience fields.');
      return;
    }
    
    setIsGenerating(true);
    setError('');

    try {
      const result = await generateContent(brief, brandVoice);
      
      const newContent: GeneratedContent = {
        id: crypto.randomUUID(),
        brief: { ...brief },
        blogPost: result.blogPost || '',
        linkedIn: result.linkedIn || '',
        instagram: result.instagram || '',
        twitter: result.twitter || '',
        emailSnippet: result.emailSnippet || '',
        imagePrompt: result.imagePrompt || '',
        status: 'Draft',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        history: [{ timestamp: Date.now(), status: 'Draft', note: 'Initial generation' }]
      };

      addContent(newContent);
      onComplete(); // Switch to the board
    } catch (e: any) {
      setError(e.message || 'An error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-3">
          Content <span className="text-indigo-600 flex items-center gap-2">Studio <Sparkles size={28} /></span>
        </h1>
        <p className="mt-3 text-slate-500 text-lg max-w-2xl mx-auto">Generate a complete multi-channel content pack (Blog, Social, Newsletter) from a single brief, perfectly aligned with your brand voice.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 md:p-10 space-y-8">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Topic / Subject</label>
                <input 
                  type="text" 
                  value={brief.topic}
                  onChange={(e) => setBrief({...brief, topic: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:outline-none focus:ring-0 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  placeholder="e.g. AI in Education"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Target Audience</label>
                <input 
                  type="text" 
                  value={brief.audience}
                  onChange={(e) => setBrief({...brief, audience: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:outline-none focus:ring-0 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  placeholder="e.g. EdTech founders and executives"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Content Tone</label>
                 <input 
                  type="text" 
                  value={brief.tone}
                  onChange={(e) => setBrief({...brief, tone: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:outline-none focus:ring-0 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  placeholder="e.g. Professional yet Approachable"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Primary Goal</label>
                <input 
                  type="text" 
                  value={brief.goals}
                  onChange={(e) => setBrief({...brief, goals: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:outline-none focus:ring-0 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  placeholder="e.g. Drive newsletter signups"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-200 flex justify-between items-center flex-wrap gap-4">
          <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
            Automations: 
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Make.com</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Canva AI</span>
          </div>

          <button 
            disabled={isGenerating}
            onClick={handleGenerate}
            className={`px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center gap-3 ${
              isGenerating ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating Pipeline...
              </>
            ) : (
              <>
                Launch Automation <Send size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client"

import React, { useState } from 'react';
import { StoreProvider } from '@/lib/store';
import { Sidebar } from '@/components/Sidebar';
import { BrandVoiceSettings } from '@/components/BrandVoiceSettings';
import { BriefGenerator } from '@/components/BriefGenerator';
import { ContentBoard } from '@/components/ContentBoard';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'generate' | 'board' | 'settings'>('generate');

  return (
    <StoreProvider>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          {activeTab === 'generate' && <BriefGenerator onComplete={() => setActiveTab('board')} />}
          {activeTab === 'board' && <ContentBoard />}
          {activeTab === 'settings' && <BrandVoiceSettings />}
        </main>
      </div>
    </StoreProvider>
  );
}

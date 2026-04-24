"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrandVoice, GeneratedContent, ContentStatus } from './types';

interface StoreContextType {
  brandVoice: BrandVoice;
  setBrandVoice: (voice: BrandVoice) => void;
  contents: GeneratedContent[];
  addContent: (content: GeneratedContent) => void;
  updateContentStatus: (id: string, newStatus: ContentStatus, note?: string) => void;
  updateContentData: (id: string, updates: Partial<GeneratedContent>, note?: string) => void;
  deleteContent: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [brandVoice, setBrandVoiceState] = useState<BrandVoice>({
    tone: 'Professional yet approachable, authoritative but easy to understand.',
    vocabulary: 'innovation, synergy, growth, user-centric, seamless',
    style: 'Use short paragraphs, clear headings, and bullet points where helpful.'
  });
  
  const [contents, setContentsState] = useState<GeneratedContent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedVocab = localStorage.getItem('aiStudio_brandVoice');
    if (savedVocab) {
      try { setBrandVoiceState(JSON.parse(savedVocab)); } catch (e) {}
    }
    const savedContents = localStorage.getItem('aiStudio_contents');
    if (savedContents) {
      try { setContentsState(JSON.parse(savedContents)); } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  const setBrandVoice = (voice: BrandVoice) => {
    setBrandVoiceState(voice);
    localStorage.setItem('aiStudio_brandVoice', JSON.stringify(voice));
  };

  const addContent = (content: GeneratedContent) => {
    const newContents = [content, ...contents];
    setContentsState(newContents);
    localStorage.setItem('aiStudio_contents', JSON.stringify(newContents));
  };

  const updateContentStatus = (id: string, newStatus: ContentStatus, note: string = 'Status changed') => {
    const newContents = contents.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          updatedAt: Date.now(),
          history: [{ timestamp: Date.now(), status: newStatus, note }, ...c.history]
        };
      }
      return c;
    });
    setContentsState(newContents);
    localStorage.setItem('aiStudio_contents', JSON.stringify(newContents));
  };

  const updateContentData = (id: string, updates: Partial<GeneratedContent>, note: string = 'Content edited') => {
    const newContents = contents.map(c => {
      if (c.id === id) {
        return {
          ...c,
          ...updates,
          updatedAt: Date.now(),
          history: [{ timestamp: Date.now(), status: c.status, note }, ...c.history]
        };
      }
      return c;
    });
    setContentsState(newContents);
    localStorage.setItem('aiStudio_contents', JSON.stringify(newContents));
  };

  const deleteContent = (id: string) => {
    const newContents = contents.filter(c => c.id !== id);
    setContentsState(newContents);
    localStorage.setItem('aiStudio_contents', JSON.stringify(newContents));
  };

  if (!isLoaded) return null; // or a loading spinner

  return (
    <StoreContext.Provider value={{
      brandVoice,
      setBrandVoice,
      contents,
      addContent,
      updateContentStatus,
      updateContentData,
      deleteContent
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

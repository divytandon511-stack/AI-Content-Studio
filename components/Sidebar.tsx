import React from 'react';
import { PenTool, Columns, Settings, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: 'generate' | 'board' | 'settings';
  setActiveTab: (tab: 'generate' | 'board' | 'settings') => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'generate', label: 'New Brief', icon: PenTool },
    { id: 'board', label: 'Pipeline Board', icon: Columns },
    { id: 'settings', label: 'Brand Voice', icon: Settings },
  ] as const;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col">
      <div className="flex h-16 items-center px-6 border-b border-slate-100">
        <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center mr-3">
          <Sparkles size={18} className="text-white" />
        </div>
        <h1 className="font-bold text-slate-800">ContentStudio</h1>
      </div>
      
      <nav className="p-4 space-y-1 flex-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Workspace</div>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={18} className="mr-3" />
              {tab.label}
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="flex items-center p-2 rounded-lg bg-slate-50">
          <div className="h-8 w-8 rounded-full bg-slate-300"></div>
          <div className="ml-3 overflow-hidden text-left">
            <p className="text-xs font-semibold truncate text-slate-800">Sarah Jenkins</p>
            <p className="text-[10px] text-slate-500 truncate">Content Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client"

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { GeneratedContent, ContentStatus } from '@/lib/types';
import { FileText, Plus, Columns, Search, Calendar, ChevronRight, Edit3, Image as ImageIcon, CheckCircle, Mail, Twitter, Linkedin, Instagram, History, Trash2, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function ContentBoard() {
  const { contents, updateContentStatus, updateContentData, deleteContent } = useStore();
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState<Partial<GeneratedContent>>({});
  const [view, setView] = useState<'board' | 'calendar'>('board');

  const colStatuses: ContentStatus[] = ['Draft', 'Review', 'Approved', 'Published'];

  const getStatusColor = (status: ContentStatus) => {
    switch(status) {
      case 'Draft': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Published': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleCardClick = (content: GeneratedContent) => {
    setSelectedContent(content);
    setEditMode(false);
  };

  const saveEdits = () => {
    if (selectedContent) {
      updateContentData(selectedContent.id, editedContent, 'Manual edit saved');
      setSelectedContent({ ...selectedContent, ...editedContent });
      setEditMode(false);
    }
  };

  const confirmDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if(window.confirm('Delete this content?')) {
      deleteContent(id);
      if(selectedContent?.id === id) setSelectedContent(null);
    }
  };

  return (
    <div className="h-full flex flex-col items-stretch p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">Content Pipeline</h1>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
           <button onClick={() => setView('board')} className={`px-4 py-1.5 text-sm font-medium rounded ${view === 'board' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-800'}`}>Board View</button>
           <button onClick={() => setView('calendar')} className={`px-4 py-1.5 text-sm font-medium rounded ${view === 'calendar' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-800'}`}>Calendar View</button>
        </div>
      </div>

      {view === 'board' ? (
        <div className="flex gap-6 flex-1 min-h-0 overflow-x-auto pb-4">
          {colStatuses.map(status => {
            const colContents = contents.filter(c => c.status === status);
            return (
              <div key={status} className="flex flex-col flex-shrink-0 w-80 bg-slate-100/50 rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(status)} uppercase tracking-wider`}>
                      {status}
                    </div>
                    <span className="text-slate-400 text-sm font-medium">{colContents.length}</span>
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                  {colContents.map(c => (
                    <div 
                      key={c.id} 
                      onClick={() => handleCardClick(c)}
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                    >
                       <div className="flex justify-between items-start mb-2 text-xs">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium truncate max-w-[150px]">
                            {c.brief.audience}
                          </span>
                          <div className="flex gap-1 text-slate-400">
                             <FileText size={14} />
                             {c.imagePrompt && <ImageIcon size={14} />}
                             <Mail size={14} />
                          </div>
                       </div>
                       <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">{c.brief.topic}</h3>
                       <div className="flex justify-between items-center mt-4">
                          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                            <Calendar size={12} /> {new Date(c.updatedAt).toLocaleDateString()}
                          </span>
                          <button onClick={(e) => confirmDelete(e, c.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={14} />
                          </button>
                       </div>
                    </div>
                  ))}
                  
                  {colContents.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                      Drop items here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 overflow-y-auto overflow-x-hidden relative">
          <div className="max-w-4xl mx-auto border-l-2 border-slate-100 pl-6 space-y-10 relative">
            {contents.sort((a, b) => b.updatedAt - a.updatedAt).map(c => (
              <div key={c.id} className="relative cursor-pointer group" onClick={() => handleCardClick(c)}>
                <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full border-[3px] border-white bg-slate-300 group-hover:bg-indigo-500 transition-colors" />
                <div className="text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                  <Calendar size={14} /> {new Date(c.updatedAt).toLocaleDateString()} at {new Date(c.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                <div className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-5 rounded-xl transition-all shadow-sm group-hover:shadow hover:border-indigo-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${getStatusColor(c.status)} uppercase tracking-wider`}>
                      {c.status}
                    </span>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider truncate max-w-[150px]">
                      {c.brief.audience}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{c.brief.topic}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{c.blogPost.substring(0, 150)}...</p>
                </div>
              </div>
            ))}
            {contents.length === 0 && (
              <div className="text-slate-400 text-center py-20">No content generated yet. Create a new brief!</div>
            )}
          </div>
        </div>
      )}

      {/* Editor Modal Overlay */}
      {selectedContent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-3xl bg-white shadow-2xl h-full flex flex-col border-l border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
               <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(selectedContent.status)} uppercase tracking-wider`}>
                      {selectedContent.status}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      Topic: {selectedContent.brief.topic}
                    </span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  {selectedContent.status !== 'Published' && (
                    <button 
                      onClick={() => {
                        const nextIdx = colStatuses.indexOf(selectedContent.status) + 1;
                        if(nextIdx < colStatuses.length) {
                          updateContentStatus(selectedContent.id, colStatuses[nextIdx]);
                          setSelectedContent({...selectedContent, status: colStatuses[nextIdx]});
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-md transition-colors shadow-sm flex items-center gap-1"
                    >
                      Approve & Advance <ArrowRight size={14} />
                    </button>
                  )}
                  <button 
                    onClick={() => { setSelectedContent(null); setEditMode(false); }}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
                  >
                    ×
                  </button>
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="flex justify-end mb-4">
                {editMode ? (
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50" onClick={() => setEditMode(false)}>Cancel</button>
                    <button className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 rounded hover:bg-slate-800" onClick={saveEdits}>Save Changes</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setEditedContent({
                        blogPost: selectedContent.blogPost,
                        linkedIn: selectedContent.linkedIn,
                        instagram: selectedContent.instagram,
                        twitter: selectedContent.twitter,
                        emailSnippet: selectedContent.emailSnippet,
                        imagePrompt: selectedContent.imagePrompt
                      });
                      setEditMode(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-xs font-bold hover:bg-slate-50"
                  >
                    <Edit3 size={12} /> Edit Content
                  </button>
                )}
              </div>

              <div className="space-y-6">
                
                {/* Blog Post */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-4">
                    <FileText className="text-blue-500" /> Blog Post
                  </h3>
                  {editMode ? (
                    <textarea 
                      className="w-full min-h-[300px] p-4 text-sm font-mono border rounded border-slate-200 bg-slate-50 focus:ring-1 ring-indigo-500 outline-none"
                      value={editedContent.blogPost}
                      onChange={e => setEditedContent({...editedContent, blogPost: e.target.value})}
                    />
                  ) : (
                    <div className="prose prose-sm prose-slate max-w-none prose-headings:font-bold">
                      <ReactMarkdown>{selectedContent.blogPost}</ReactMarkdown>
                    </div>
                  )}
                </div>

                {/* Social Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LinkedIn */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                      <Linkedin className="text-blue-700" size={16} /> LinkedIn
                    </h3>
                    {editMode ? (
                      <textarea 
                        className="w-full min-h-[150px] p-3 text-xs border rounded border-slate-200 bg-slate-50"
                        value={editedContent.linkedIn}
                        onChange={e => setEditedContent({...editedContent, linkedIn: e.target.value})}
                      />
                    ) : (
                      <div className="text-sm whitespace-pre-wrap text-slate-700">{selectedContent.linkedIn}</div>
                    )}
                  </div>
                  
                  {/* Twitter */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                      <Twitter className="text-sky-500" size={16} /> Twitter/X
                    </h3>
                    {editMode ? (
                      <textarea 
                        className="w-full min-h-[150px] p-3 text-xs border rounded border-slate-200 bg-slate-50"
                        value={editedContent.twitter}
                        onChange={e => setEditedContent({...editedContent, twitter: e.target.value})}
                      />
                    ) : (
                      <div className="text-sm whitespace-pre-wrap text-slate-700">{selectedContent.twitter}</div>
                    )}
                  </div>

                  {/* Instagram */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                      <Instagram className="text-pink-600" size={16} /> Instagram
                    </h3>
                    {editMode ? (
                      <textarea 
                        className="w-full min-h-[150px] p-3 text-xs border rounded border-slate-200 bg-slate-50"
                        value={editedContent.instagram}
                        onChange={e => setEditedContent({...editedContent, instagram: e.target.value})}
                      />
                    ) : (
                      <div className="text-sm whitespace-pre-wrap text-slate-700">{selectedContent.instagram}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                      <Mail className="text-amber-500" size={16} /> Newsletter Snippet
                    </h3>
                    {editMode ? (
                      <textarea 
                        className="w-full min-h-[150px] p-3 text-xs border rounded border-slate-200 bg-slate-50"
                        value={editedContent.emailSnippet}
                        onChange={e => setEditedContent({...editedContent, emailSnippet: e.target.value})}
                      />
                    ) : (
                      <div className="text-sm whitespace-pre-wrap text-slate-700">{selectedContent.emailSnippet}</div>
                    )}
                  </div>
                </div>

                {/* Canva Prompt */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ImageIcon size={64} />
                  </div>
                  <h3 className="font-bold text-sm text-purple-900 flex items-center gap-2 mb-3 relative z-10">
                    <ImageIcon size={16} /> Canva AI Generation Prompt
                  </h3>
                   {editMode ? (
                      <textarea 
                        className="w-full min-h-[100px] p-3 text-xs border rounded border-purple-200 bg-white/80 backdrop-blur relative z-10"
                        value={editedContent.imagePrompt}
                        onChange={e => setEditedContent({...editedContent, imagePrompt: e.target.value})}
                      />
                    ) : (
                      <div className="text-sm italic text-purple-800 relative z-10 bg-white/60 p-4 rounded-xl border border-purple-100">{selectedContent.imagePrompt}</div>
                    )}
                </div>

                {/* Version History */}
                <div className="mt-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <History size={14} /> Revision History
                  </h3>
                  <div className="space-y-3">
                    {selectedContent.history.map((rev, i) => (
                      <div key={i} className="flex gap-4 items-start text-sm">
                        <div className="w-32 shrink-0 text-slate-400 text-xs mt-0.5 whitespace-nowrap">
                          {new Date(rev.timestamp).toLocaleString()}
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider mb-1 ${getStatusColor(rev.status)}`}>{rev.status}</span>
                          <p className="text-slate-600">{rev.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

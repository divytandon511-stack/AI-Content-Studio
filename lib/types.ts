export type ContentStatus = 'Draft' | 'Review' | 'Approved' | 'Published';

export interface BrandVoice {
  tone: string;
  vocabulary: string;
  style: string;
}

export interface Brief {
  topic: string;
  audience: string;
  tone: string;
  goals: string;
}

export interface GeneratedContent {
  id: string;
  brief: Brief;
  blogPost: string;
  linkedIn: string;
  instagram: string;
  twitter: string;
  emailSnippet: string;
  imagePrompt: string;
  status: ContentStatus;
  createdAt: number;
  updatedAt: number;
  history: ContentRevision[];
}

export interface ContentRevision {
  timestamp: number;
  status: ContentStatus;
  note: string;
}

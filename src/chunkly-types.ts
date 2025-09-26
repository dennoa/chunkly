export interface DocumentSection {
  from?: string;
  to?: string;
  lookup?: string;
}

export type ContentType = 'docx' | 'html' | 'pdf' | 'txt';

export interface DocumentOptions {
  source: string;
  type: ContentType;
  sections?: DocumentSection[];
}

export interface WorkingChunk {
  text: string;
  lookup?: string;
}

export interface Chunk extends WorkingChunk {
  source: string;
  lookup: string;
  timestamp: string;
  chunkIdx: number;
}

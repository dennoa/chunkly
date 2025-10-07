export interface DocumentSection {
  from?: string;
  to?: string;
  ref?: string;
}

export type ContentType = 'docx' | 'html' | 'pdf' | 'txt';

export interface DocumentOptions {
  source: string;
  type: ContentType;
  sections?: DocumentSection[];
}

export interface WorkingChunk {
  text: string;
  ref?: string;
}

export interface Chunk extends WorkingChunk {
  source: string;
  ref: string;
  timestamp: string;
  chunkIdx: number;
}

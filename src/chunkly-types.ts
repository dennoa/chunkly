export interface DocumentSection {
  from?: string;
  to?: string;
  ref?: string;
}

export type ContentType = 'docx' | 'html' | 'pdf' | 'txt';

export interface DocumentOptions {
  buffer?: Buffer;
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
  chunkIdx: number;
}

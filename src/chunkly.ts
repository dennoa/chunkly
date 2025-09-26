import config from './config';
import logger from './logger';
import { Chunk, DocumentOptions } from './chunkly-types';
import { HtmlToJson } from './html-to-json';
import { NotepadToJson } from './notepad-to-json';
import { PdfToJson } from './pdf-to-json';
import { TextToJsonOptions } from './text-to-json';
import { WordToJson } from './word-to-json';

export interface ChunklyOptions extends TextToJsonOptions {}

export class Chunkly {
  options: ChunklyOptions;
  constructor(private opts?: ChunklyOptions) {
    this.options = opts || config.textToJsonOptions;
  }

  public async chunkItUp(docOpts: DocumentOptions): Promise<Chunk[]> {
    try {
      switch (docOpts.type) {
        case 'docx':
          return new WordToJson(this.options).chunkItUp(docOpts);
        case 'html':
          return new HtmlToJson(this.options).chunkItUp(docOpts);
        case 'pdf':
          return new PdfToJson(this.options).chunkItUp(docOpts);
        case 'txt':
          return new NotepadToJson(this.options).chunkItUp(docOpts);
        default:
          throw new Error(`Unsupported document type ${docOpts.type}`);
      }
    } catch (error: any) {
      logger.error(`Error chunking document: ${error.message}`);
      throw error;
    }
  }
}
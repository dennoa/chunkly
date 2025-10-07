import mammoth from 'mammoth';
import { Chunk, DocumentOptions } from './chunkly-types';
import { FileLoader } from './file-loader';
import logger from './logger';
import { TextToJson, TextToJsonOptions } from './text-to-json';

export class WordToJson {
  textToJson: TextToJson;
  fileLoader: FileLoader;
  constructor(private options: TextToJsonOptions) {
    this.textToJson = new TextToJson(options);
    this.fileLoader = new FileLoader({ type: 'docx' })
  }

  public async chunkItUp(docOpts: DocumentOptions): Promise<Chunk[]> {
    try {
      const buffer = docOpts.buffer ? docOpts.buffer : await this.fileLoader.load(docOpts.source)
      const result = await mammoth.extractRawText({ buffer });
      return this.textToJson.chunkItUp(result.value, docOpts);
    } catch (error: any) {
      logger.error(`Error parsing docx: ${error.message}`);
      throw error;
    }
  }
  
}
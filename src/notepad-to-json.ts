import { Chunk, DocumentOptions } from './chunkly-types';
import { FileLoader } from './file-loader';
import logger from './logger';
import { TextToJson, TextToJsonOptions } from './text-to-json';

export class NotepadToJson {
  textToJson: TextToJson;
  fileLoader: FileLoader;
  constructor(private options: TextToJsonOptions) {
    this.textToJson = new TextToJson(options);
    this.fileLoader = new FileLoader({ type: 'txt' })
  }

  public async chunkItUp(docOpts: DocumentOptions): Promise<Chunk[]> {
    try {
      const text = await this.fileLoader.load(docOpts.source);
      return this.textToJson.chunkItUp(text, docOpts);
    } catch (error: any) {
      logger.error(`Error parsing txt: ${error.message}`);
      throw error;
    }
  }
  
}
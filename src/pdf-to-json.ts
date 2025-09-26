import pdf from 'pdf-parse';
import { Chunk, DocumentOptions } from './chunkly-types';
import { FileLoader } from './file-loader';
import logger from './logger';
import { TextToJson, TextToJsonOptions } from './text-to-json';

export class PdfToJson {
  textToJson: TextToJson;
  fileLoader: FileLoader;
  constructor(private options: TextToJsonOptions) {
    this.textToJson = new TextToJson(options);
    this.fileLoader = new FileLoader({ type: 'pdf' })
  }

  public async chunkItUp(docOpts: DocumentOptions): Promise<Chunk[]> {
    try {
      const buffer = await this.fileLoader.load(docOpts.source);
      const result = await pdf(buffer);
      return this.textToJson.chunkItUp(result.text, docOpts);
    } catch (error: any) {
      logger.error(`Error parsing pdf: ${error.message}`);
      throw error;
    }
  }
  
}
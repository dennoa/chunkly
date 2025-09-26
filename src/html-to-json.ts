import { htmlToText, HtmlToTextOptions } from 'html-to-text';
import { Chunk, DocumentOptions } from './chunkly-types';
import { FileLoader } from './file-loader';
import logger from './logger';
import { TextToJson, TextToJsonOptions } from './text-to-json';

export interface HtmlToJsonOptions extends TextToJsonOptions {
  htmlToTextOptions?: HtmlToTextOptions;
}

export class HtmlToJson {
  textToJson: TextToJson;
  htmlToTextOptions: HtmlToTextOptions;
  fileLoader: FileLoader;
  constructor(private options: HtmlToJsonOptions) {
    this.textToJson = new TextToJson(options);
    this.htmlToTextOptions = options.htmlToTextOptions || {
      selectors: [
        { selector: 'a', options: { ignoreHref: true } },
      ]
    };
    this.fileLoader = new FileLoader({ type: 'html' })
  }

  public async chunkItUp(docOpts: DocumentOptions): Promise<Chunk[]> {
    try {
      const html = await this.fileLoader.load(docOpts.source);
      const text = htmlToText(html, this.htmlToTextOptions);
      return this.textToJson.chunkItUp(text, docOpts);
    } catch (error: any) {
      logger.error(`Error parsing html: ${error.message}`);
      throw error;
    }
  }
  
}
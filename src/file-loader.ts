import fs from 'fs/promises';
import logger from './logger';
import { ContentType } from './chunkly-types';

export interface FileLoaderOptions {
  type: ContentType;
}

export class FileLoader {
  constructor(private options: FileLoaderOptions) {}

  public load(source: string): Promise<any> {
    try {
      return source.startsWith('http') ? this.getDataFromUrl(source) : this.getDataFromFile(source);
    } catch (error: any) {
      logger.error(`Error loading file from ${source}: ${error.message}`);
      throw error;
    }
  }

  private isText() {
    const { type } = this.options;
    return (type === 'html' || type === 'txt');
  }

  private async getDataFromUrl(source: string): Promise<any> {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`Failed to fetch ${source}: ${res.statusText}`);
    return this.isText() ? res.text() : res.blob();
  }
  
  private getDataFromFile(source: string): Promise<any> {
    return this.isText() ? fs.readFile(source, 'utf8') : fs.readFile(source);
  }
  
}
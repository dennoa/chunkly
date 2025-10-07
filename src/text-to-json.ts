import { Chunk, DocumentOptions, DocumentSection, WorkingChunk } from './chunkly-types';

export interface TextToJsonOptions {
  targetWordsPerChunk: number;
  minOverlapWords: number;
  maxOverlapWords: number;
  minWordsPerChunk: number;
  maxWordsPerChunk: number;
}

export class TextToJson {
  constructor(private options: TextToJsonOptions) {}

  public chunkItUp(rawText: string, docOpts: DocumentOptions): Chunk[] {
    const text = rawText.replace(/\s+/g, ' ').trim(); // Clean up whitespace
    const timestamp = new Date().toJSON();
    const docToUse = docOpts.sections?.length ? docOpts : { ...docOpts, sections: [{}] };
    return this.getChunks(text, docToUse).map((chunk, chunkIdx) => ({
      text: chunk.text.trim(),
      source: docOpts.source,
      ref: chunk.ref || '',
      timestamp,
      chunkIdx,
    }));
  }

  private isSentenceEnd = (text: string) => text.endsWith('.') || text.endsWith('!') || text.endsWith('?');

  private getChunks(textStr: string, docOpts: DocumentOptions): WorkingChunk[] {
    const { targetWordsPerChunk, minWordsPerChunk, minOverlapWords, maxOverlapWords, maxWordsPerChunk } = this.options;
    let toIdx = 0;
    return docOpts.sections!.reduce((acc: WorkingChunk[], section: DocumentSection) => {
      const { ref } = section;
      let fromIdx = section.from ? textStr.indexOf(section.from, toIdx) : toIdx;
      toIdx = section.to ? textStr.indexOf(section.to, fromIdx + 1) : textStr.length;
      const words = textStr.substring(fromIdx, toIdx).split(' ');
      let startIdx = 0;
      while (startIdx < words.length) {
        let endIdx = startIdx + targetWordsPerChunk; // Target end
        const maxEndIdx = Math.min(startIdx + maxWordsPerChunk, words.length);
        while (endIdx < maxEndIdx && !this.isSentenceEnd(words[endIdx])) endIdx++; // Extend to sentence end
        if (endIdx < maxEndIdx) endIdx++; // Include the sentence end      
        if (endIdx + minWordsPerChunk >= words.length) {
          endIdx = words.length; // Next chunk too small so extend this chunk
        }
        const text = words.slice(startIdx, endIdx).join(' ').trim();
        if (text.length > 0) acc.push({ ref, text });
        startIdx = endIdx;
        if (endIdx < words.length) {
          startIdx = endIdx - minOverlapWords; // Start with minimum overlap
          const minStartIdx = endIdx - maxOverlapWords;
          while (startIdx >= minStartIdx && !this.isSentenceEnd(words[startIdx])) startIdx--; // Extend to sentence start
          startIdx++; // Do not include the previous sentence end
        }
      }
      return acc;
    }, []);
  }
}
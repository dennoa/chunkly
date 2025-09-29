import path from 'path';
import { Chunkly, ChunklyOptions } from './chunkly';
import { DocumentOptions } from './chunkly-types';

describe('Chunkly', () => {
  let chunkly: Chunkly;
  let options: ChunklyOptions = {
    targetWordsPerChunk: 100,
    minOverlapWords:10,
    maxOverlapWords: 20,
    minWordsPerChunk: 50,
  }

  beforeEach(() => {
    chunkly = new Chunkly(options);
  });

  it('should chunk up a pdf document', async () => {
    const docOpts: DocumentOptions = {
      source: path.normalize(path.join(__dirname, '..', 'test-docs', 'test-pdf.pdf')),
      type: 'pdf',
    };
    const chunks = await chunkly.chunkItUp(docOpts);
    expect(chunks.length).toBe(3);
    chunks.forEach((chunk, idx) => {
      expect(chunk.source).toMatch(/test-pdf\.pdf$/);
      expect(chunk.chunkIdx).toBe(idx);
    });
  });

  it('should chunk up a word document', async () => {
    const docOpts: DocumentOptions = {
      source: path.normalize(path.join(__dirname, '..', 'test-docs', 'test-docx.docx')),
      type: 'docx',
    };
    const chunks = await chunkly.chunkItUp(docOpts);
    expect(chunks.length).toBe(4);
    chunks.forEach((chunk, idx) => {
      expect(chunk.source).toMatch(/test-docx\.docx$/);
      expect(chunk.chunkIdx).toBe(idx);
    });
  });

  it('should allow sections to be specified', async () => {
    const docOpts: DocumentOptions = {
      source: path.normalize(path.join(__dirname, '..', 'test-docs', 'test-docx.docx')),
      type: 'docx',
      sections: [
        { from: 'Evidence of consultation and collaboration', to: 'Evidence of assessed individual needs', lookup: 'Parents / Guardians' },
        { to: 'Evidence that adjustments are being provided', lookup: 'Individual Needs' },
        { to: 'Evidence that adjustments provided to the student', lookup: 'Adjustments Provided' },
        { lookup: 'Adjustments Monitored' },
      ],
    };
    const chunks = await chunkly.chunkItUp(docOpts);
    expect(chunks.length).toBe(4);
    chunks.forEach((chunk, idx) => {
      expect(chunk.source).toMatch(/test-docx\.docx$/);
      expect(chunk.chunkIdx).toBe(idx);
    });
  });
});

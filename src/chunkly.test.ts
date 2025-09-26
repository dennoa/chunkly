import { Chunkly, ChunklyOptions } from "./chunkly";

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

  it('should chunk up a text document', () => {
    // TODO
  });
});

# chunkly

Chunks up documents.

For best results the documents should not rely on tables or images to provide context or other information. These type of documents should be reformatted into paragraphs and sections with headings.


## Configuration

Can be configured with environment variables as follows:

```sh
CHUNKLY_LOG_LEVEL=debug
CHUNKLY_TARGET_WORDS_PER_CHUNK=100
CHUNKLY_MIN_OVERLAP_WORDS=5
CHUNKLY_MAX_OVERLAP_WORDS=20
CHUNKLY_MIN_WORDS_PER_CHUNK=50
CHUNKLY_MAX_WORDS_PER_CHUNK=200
```

or by instantiating the Chunkly class with options:

```js
const options: ChunklyOptions = {
  targetWordsPerChunk: 100,
  minOverlapWords: 5,
  maxOverlapWords: 20,
  minWordsPerChunk: 50,
  maxWordsPerChunk: 200,
};
const chunkly = new Chunkly(options);
```

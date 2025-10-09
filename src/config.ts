export const config = {
  log: {
    level: process.env.CHUNKLY_LOG_LEVEL || 'info',
  },
  textToJsonOptions: {
    targetWordsPerChunk: parseInt(process.env.CHUNKLY_TARGET_WORDS_PER_CHUNK || '100'),
    minOverlapWords: parseInt(process.env.CHUNKLY_MIN_OVERLAP_WORDS || '5'),
    maxOverlapWords: parseInt(process.env.CHUNKLY_MAX_OVERLAP_WORDS || '20'),
    minWordsPerChunk: parseInt(process.env.CHUNKLY_MIN_WORDS_PER_CHUNK || '50'),
    maxWordsPerChunk: parseInt(process.env.CHUNKLY_MAX_WORDS_PER_CHUNK || '200'),
  },
};

export default config;
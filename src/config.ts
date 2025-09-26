export const config = {
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  textToJsonOptions: {
    targetWordsPerChunk: parseInt(process.env.TARGET_WORDS_PER_CHUNK || '100'),
    minOverlapWords: parseInt(process.env.MIN_OVERLAP_WORDS || '10'),
    maxOverlapWords: parseInt(process.env.MAX_OVERLAP_WORDS || '20'),
    minWordsPerChunk: parseInt(process.env.MIN_WORDS_PER_CHUNK || '50'),
  },
};

export default config;
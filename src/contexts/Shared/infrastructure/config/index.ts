import convict from 'convict';

const bestreadsConfig = convict({
  env: {
    doc: 'Bestreads environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV',
  },
  postgre: {
    url: {
      doc: 'PostgreSQL Test connection URL',
      format: String,
      env: 'DB',
    },
  },
});

export default bestreadsConfig;

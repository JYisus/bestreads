import convict from 'convict';

const bestreadsConfig = convict({
  env: {
    doc: 'Bestreads environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV',
  },
  memory: {
    url: {
      doc: 'PostgreSQL Test connection URL',
      format: String,
      env: 'DB',
      default: 'postgres://postgres@localhost/mydb',
    },
  },
});

export default bestreadsConfig;

import BestReadsBackendApp from './BestReadsBackendApp.js';
import RepositoryBuilder from '../Shared/persistence/RepositoryBuilder.js';
import LoggerBuilder from '../Shared/logger/LoggerBuilder.js';

const port = process.env.PORT || 3000;
const runService = async () => {
  const logger = LoggerBuilder.build();
  const repository = await RepositoryBuilder.build('memory', '');
  new BestReadsBackendApp(port, repository, logger).start();
}

try {
  runService();
} catch (error) {
  console.err(error);
  process.exit(1);
}

process.on('uncaughtException', (error) => {
  console.err('uncaughtException', error);
  process.exit(1);
});

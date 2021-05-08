import BestReadsBackendApp from './BestReadsBackendApp';
import RepositoryBuilder from '../Shared/infrastructure/persistence/RepositoryBuilder';
import LoggerBuilder from '../Shared/infrastructure/logger/LoggerBuilder';

const API_KEY = '67c6b898-6dad-4e70-92c5-f63c85077ca1';
const port = process.env.PORT || 3000;
const runService = async () => {
  const logger = LoggerBuilder.build();
  const repository = await RepositoryBuilder.build('postgre', '');
  new BestReadsBackendApp(Number(port), repository, logger).start();
};

try {
  runService();
} catch (error) {
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
  process.exit(1);
});

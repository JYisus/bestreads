import BestReadsBackendApp from './BestReadsBackendApp';
import RepositoryBuilder from '../Shared/infrastructure/persistence/RepositoryBuilder';
import LoggerBuilder from '../Shared/infrastructure/logger/LoggerBuilder';

const port = process.env.PORT || 3000;
const database = process.env.DATABASE || '';

const runService = async () => {
  const logger = LoggerBuilder.build();
  const repository = await RepositoryBuilder.build('postgre', database);
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

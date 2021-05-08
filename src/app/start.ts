import BestReadsBackendApp from './BestReadsBackendApp';
import RepositoryBuilder from '../Shared/infrastructure/persistence/RepositoryBuilder';
import LoggerBuilder from '../Shared/infrastructure/logger/LoggerBuilder';

const port = process.env.PORT || 3000;
const runService = async () => {
  const command = process.argv[1];
  eval(command);
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

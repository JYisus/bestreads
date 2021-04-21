import BestReadsBackendApp from './BestReadsBackendApp.js';
import RepositoryBuilder from '../../src/Shared/infrastructure/persistence/RepositoryBuilder.js';
const port = process.env.PORT || 3000;
const runService = async () => {
  const repository = await RepositoryBuilder.build('memory', '');
  new BestReadsBackendApp(port, repository).start();
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

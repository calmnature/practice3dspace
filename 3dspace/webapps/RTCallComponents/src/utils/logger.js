import { requirejs } from '../modules/require';
import { version } from '../../package.json';

let logger = null;

export const initLogger = async () => {
  const [Logger] = await requirejs(['DS/RTProxyDriver/RTLogger']);
  if (Logger && !Logger.levels.includes('RTCallComponents')) {
    Logger.addLevel('RTCallComponents', 'hotpink');
  }
  Logger.RTCallComponents('RTCallComponents version: ' + version);
  logger = Logger;
  return logger;
};

export const Logger = async () => {
  if (!logger) {
    await initLogger();
  }
  return logger;
};

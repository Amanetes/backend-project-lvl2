import path from 'path';
import { load } from 'js-yaml';

const parseFile = (file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(file);
  }
  return load(file);
};
export default parseFile;

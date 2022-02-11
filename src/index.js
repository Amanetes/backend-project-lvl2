import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import format from './formatters/index.js';
import createDiff from './diffCreator.js';

export default ((filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(readFileSync(path.resolve(process.cwd(), filepath1), 'utf8'));
  const data2 = parseFile(readFileSync(path.resolve(process.cwd(), filepath2), 'utf8'));

  const diff = createDiff(data1, data2, format);
  return format(diff, formatName);
});

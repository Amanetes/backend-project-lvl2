import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import format from './formatters/index.js';
import createDiff from './diffCreator.js';

const getFileExtension = (file) => path.extname(file);
const readFile = (file) => readFileSync(path.resolve(process.cwd(), file), 'utf8');

export default ((filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const dataFormat1 = getFileExtension(filepath1).slice(1);
  const dataFormat2 = getFileExtension(filepath2).slice(1);
  const parsedData1 = parseFile(data1, dataFormat1);
  const parsedData2 = parseFile(data2, dataFormat2);
  const diff = createDiff(parsedData1, parsedData2);
  return format(diff, formatName);
});

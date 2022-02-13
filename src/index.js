import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import format from './formatters/index.js';
import createDiff from './diffCreator.js';

const getDataFormat = (file) => path.extname(file);
const readFile = (file) => readFileSync(path.resolve(process.cwd(), file), 'utf8');

export default ((filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const dataFormat1 = getDataFormat(filepath1).slice(1);
  const dataFormat2 = getDataFormat(filepath2).slice(1);
  const parsedData1 = parseFile(data1, dataFormat1);
  const parsedData2 = parseFile(data2, dataFormat2);
  const diff = createDiff(parsedData1, parsedData2);
  return format(diff, formatName);
});

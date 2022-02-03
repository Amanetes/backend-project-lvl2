import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

// Функция читает путь файлов и возвращает отличия

const genDiff = () => {
  const filepath1 = JSON.parse(readFileSync(path.resolve(process.cwd(), '__fixtures__/file1.json'), 'utf8'));
  const filepath2 = JSON.parse(readFileSync(path.resolve(process.cwd(), '__fixtures__/file2.json'), 'utf8'));
  const merged = _.sortBy(Object.keys({ ...filepath1, ...filepath2 }));
  const res = {};
  for (const key of merged) {
    if (!Object.hasOwn(filepath1, key)) {
      res[`+ ${key}`] = filepath2[key];
    } else if (filepath1[key] === filepath2[key]) {
      res[`  ${key}`] = filepath1[key];
    } else if (Object.hasOwn(filepath2, key)) {
      res[`- ${key}`] = filepath1[key];
      res[`+ ${key}`] = filepath2[key];
    } else if (Object.hasOwn(filepath1, key)) {
      res[`- ${key}`] = filepath1[key];
    }
  }
  return res;
};
export default genDiff;

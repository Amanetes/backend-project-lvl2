import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

// Функция читает путь файлов и возвращает отличия
// readFileSync читает относительный путь до файла
// path.resolve - строит абсолютный путь

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath1), 'utf8'));
  const data2 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath2), 'utf8'));
  const merged = _.sortBy(Object.keys({ ...data1, ...data2 }));
  // В пустой объект с помощью reduce добавляем ключи
  const result = merged.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (data1[key] === data2[key]) {
      acc[`  ${key}`] = data1[key] || data2[key];
    } else if (data1[key] !== data2[key]) {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    }
    return acc;
  }, {});
  return JSON.stringify(result, null, 2);
};
export default genDiff;

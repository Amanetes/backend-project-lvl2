import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

// Функция читает путь файлов и возвращает отличия
// readFileSync читает относительный путь до файла
// path.resolve - строит абсолютный путь

const genDiff = (file1, file2) => {
  const filepath1 = JSON.parse(readFileSync(path.resolve(process.cwd(), file1), 'utf8'));
  const filepath2 = JSON.parse(readFileSync(path.resolve(process.cwd(), file2), 'utf8'));
  const merged = _.sortBy(Object.keys({ ...filepath1, ...filepath2 }));
  // В пустой объект с помощью reduce добавляем ключи
  return merged.reduce((acc, key) => {
    if (!Object.hasOwn(filepath1, key) && Object.hasOwn(filepath2, key)) {
      acc[`+ ${key}`] = filepath2[key];
    } else if (Object.hasOwn(filepath1, key) && !Object.hasOwn(filepath2, key)) {
      acc[`- ${key}`] = filepath1[key];
    } else if (filepath1[key] === filepath2[key]) {
      acc[`  ${key}`] = filepath1[key] || filepath2[key];
    } else if (filepath1[key] !== filepath2[key]) {
      acc[`- ${key}`] = filepath1[key];
      acc[`+ ${key}`] = filepath2[key];
    }
    return acc;
  }, {});
};
export default genDiff;

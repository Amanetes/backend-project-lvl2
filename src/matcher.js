import _ from 'lodash';

const matchFiles = ((data1, data2) => {
  // Формирование массива уникальных ключей из 2х объектов
  const merged = _.sortBy(Object.keys({ ...data1, ...data2 }));
  // Сборка объекта на основе сравнения ключей объектов и массива
  const result = merged.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      acc[`  ${key}`] = matchFiles(data1[key], data2[key]);
    } else if (data1[key] !== data2[key]) {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    } else {
      acc[` ${key}`] = data1[key];
    }
    return acc;
  }, {});
  return result;
});
export default matchFiles;

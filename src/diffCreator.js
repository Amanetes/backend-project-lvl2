import _ from 'lodash';

const createDiff = (data1, data2) => {
  // Формирование массива уникальных ключей из 2х объектов
  const merged = _.sortBy(Object.keys({ ...data1, ...data2 }));
  // Выводим в результат новый массив ключей/значений
  return merged.reduce((acc, key) => {
    // Создание внутреннего представления структуры файла (пример - ESPRIMA)
    // Обязательно вернуть аккумулятор в каждом условии!
    if (!_.has(data1, key)) {
      return [...acc, {
        name: key,
        type: 'ADDED',
        value:
        data2[key],
      }];
    }
    if (!_.has(data2, key)) {
      return [...acc, {
        name: key,
        type: 'DELETED',
        value: data1[key],
      }];
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return [...acc, {
        name: key,
        type: 'NESTED',
        value: createDiff(data1[key], data2[key]),
      }];
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return [...acc, {
        name: key,
        type: 'MODIFIED',
        oldValue: data1[key],
        newValue: data2[key],
      }];
    }
    return [...acc, {
      name: key,
      type: 'UNCHANGED',
      value: data1[key],
    }];
  }, []);
};
export default createDiff;

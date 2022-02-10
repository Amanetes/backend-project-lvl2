import _ from 'lodash';

const matchFiles = (data1, data2) => {
  // Формирование массива уникальных ключей из 2х объектов
  const merged = _.sortBy(Object.keys({ ...data1, ...data2 }));
  // Выводим в результат новый массив ключей/значений
  return merged.map((key) => {
    // Записываем в результирующий массив - объекты
    // с новым внутренним представлением(аналог - Esprima)
    if (!Object.hasOwn(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { name: key, type: 'deleted', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { name: key, type: 'nested', children: matchFiles(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key, type: 'changed', previousValue: data1[key], newValue: data2[key],
      };
    }
    return {
      name: key, type: 'similar', key, value: data1[key],
    };
  });
};
export default matchFiles;

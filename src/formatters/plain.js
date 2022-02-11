import _ from 'lodash';
// Извлечение значения
const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (node, path) => {
    const lines = node
    // Деструктуризация по ключам объекта
      .map(({
        name, type, value, oldValue, newValue,
      }) => {
        // Проверка по ключу тип
        switch (type) {
          case 'ADDED':
            // Получаем путь до и имя со значением
            return `Property '${path}${name}' was added with value: ${getValue(value)}`;
          case 'DELETED':
            return `Property '${path}${name}' was removed`;
          case 'NESTED':
            return iter(value, `${path}${name}.`);
          case 'MODIFIED':
            return `Property '${path}${name}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
          default:
            return `Property '${path}${name}' wasn't modified`;
        }
      });
    return [...lines].join('\n');
  };
  return iter(diff, '');
};
export default plain;

import _ from 'lodash';

// Функция генерации отступа
const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);
// Преобразование текущего объекта в строку
const stringify = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) {
    return String(currentValue);
  }
  const currentIndent = getIndent(depth);
  const lines = Object
    .entries(currentValue)
    .map(([key, value]) => `${currentIndent}    ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${getIndent(depth)}}`,
  ].join('\n');
};
// Форматирование всего дерева
const stylish = (diff) => {
  const iter = (node, depth) => {
    if (_.isPlainObject(node)) {
      return String(node);
    }
    const lines = node.map((currentValue) => {
      // Деструктуризируем текущий объект и далее по значению ключа type
      // добавляем знаки и отступы
      const {
        name, type, value, oldValue, newValue,
      } = currentValue;
      switch (type) {
        case 'ADDED':
          return `${getIndent(depth)}  + ${name}: ${stringify(value, depth + 1)}`;
        case 'NESTED':
          return `${getIndent(depth)}    ${name}: ${iter(value, depth + 1)}`;
        case 'DELETED':
          return `${getIndent(depth)}  - ${name}: ${stringify(value, depth + 1)}`;
        case 'MODIFIED':
          return [
            `${getIndent(depth)}  - ${name}: ${stringify(oldValue, depth + 1)}`,
            `${getIndent(depth)}  + ${name}: ${stringify(newValue, depth + 1)}`,
          ].join('\n');
        case 'UNCHANGED':
          return `${getIndent(depth)}    ${name}: ${stringify(value, depth + 1)}`;
        default:
          throw new Error(`Undefined type ${type}`);
      }
    });
    return [
      '{',
      ...lines,
      `${getIndent(depth)}}`,
    ].join('\n');
  };
  return iter(diff, 0);
};
export default stylish;

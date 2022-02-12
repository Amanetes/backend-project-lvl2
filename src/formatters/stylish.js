import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);
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
const stylish = (diff) => {
  const iter = (node, depth) => {
    const lines = node.map((currentValue) => {
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

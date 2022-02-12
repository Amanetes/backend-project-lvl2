import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
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
      .filter(({ type }) => type !== 'UNCHANGED')
      .map(({
        name, type, value, oldValue, newValue,
      }) => {
        switch (type) {
          case 'ADDED':
            return `Property '${path}${name}' was added with value: ${getValue(value)}`;
          case 'DELETED':
            return `Property '${path}${name}' was removed`;
          case 'NESTED':
            return iter(value, `${path}${name}.`);
          case 'MODIFIED':
            return `Property '${path}${name}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
          default:
            throw new Error(`Undefined type ${type}`);
        }
      });
    return [...lines].join('\n');
  };
  return iter(diff, '');
};
export default plain;

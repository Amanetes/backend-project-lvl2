import stylish from './stylish.js';
import plain from './plain.js';
import makeJson from './json.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return makeJson(diff);
    default:
      throw new Error(`Undefined format ${formatName}`);
  }
};

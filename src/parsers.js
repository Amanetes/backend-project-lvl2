import { load } from 'js-yaml';

const parseFile = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return load(file);
    default:
      throw new Error(`Undefined file format'${format}'`);
  }
};
export default parseFile;

import { load } from 'js-yaml';

const parseFile = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return load(file);
    case 'yaml':
      return load(file);
    default:
      throw new Error(`Undefined file extension '${extension}'`);
  }
};
export default parseFile;

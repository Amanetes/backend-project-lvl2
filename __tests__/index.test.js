import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');
const stylishFormat = readFile('expected_stylish.txt');
const plainFormat = readFile('expected_plain.txt');
const jsonFormat = readFile('expected_json.txt');

const cases = [
  [file1Json, file2Json, 'stylish', stylishFormat],
  [file1Yml, file2Yml, 'plain', plainFormat],
  [file1Json, file2Yml, 'json', jsonFormat],
];

describe('Check stylish format', () => {
  test.each(cases)(
    'given %p, %p and %p as arguments, returns %p',
    (firstArg, secondArg, thirdArg, expectedResult) => {
      expect(genDiff(firstArg, secondArg, thirdArg)).toEqual(expectedResult);
    },
  );
});

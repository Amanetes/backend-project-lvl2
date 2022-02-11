import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let testJson1;
let testJson2;
let expected;
let testYml1;
let testYml2;
let expectedPlain;
let expectedJson;
beforeEach(() => {
  testJson1 = getFixturePath('file1.json');
  testJson2 = getFixturePath('file2.json');
  testYml1 = getFixturePath('file1.yml');
  testYml2 = getFixturePath('file2.yml');
  expected = readFile('expected_file.txt');
  expectedPlain = readFile('expected_plain.txt');
  expectedJson = readFile('expected_json.txt');
});
test('stylish format', () => {
  expect(genDiff(testJson1, testJson2, 'stylish')).toEqual(expected);
});
test('plain format', () => {
  expect(genDiff(testJson1, testJson2, 'plain')).toEqual(expectedPlain);
});
test('json format', () => {
  expect(genDiff(testJson1, testJson2, 'json')).toEqual(expectedJson);
});
test('yml', () => {
  expect(genDiff(testYml1, testYml2)).toEqual(expected);
});
test('format errors', () => {
  expect(genDiff(testJson1, testJson2, 'someformat')).toThrow(Error);
});
test('parser', () => {
  expect(path.extname(testJson1)).toEqual('.json');
  expect(path.extname(testYml1)).toEqual('.yml');
});

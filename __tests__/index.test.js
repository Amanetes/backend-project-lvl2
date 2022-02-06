import { beforeEach, expect, test } from '@jest/globals';
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
beforeEach(() => {
  testJson1 = getFixturePath('file1.json');
  testJson2 = getFixturePath('file2.json');
  expected = readFile('expected_file.txt');
  testYml1 = getFixturePath('file1.yml');
  testYml2 = getFixturePath('file2.yml');
});
test('json difference check', () => {
  expect(genDiff(testJson1, testJson2)).toEqual(expected);
});
test('yml difference check', () => {
  expect(genDiff(testYml1, testYml2)).toEqual(expected);
});

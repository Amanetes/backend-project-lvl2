import { beforeEach, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let testData1;
let testData2;
let expected;
beforeEach(() => {
  testData1 = readFile('file1.json');
  testData2 = readFile('file2.json');
  expected = readFile('expected_file.json');
});
test('file equality', () => {
  expect(genDiff(testData1, testData2)).toEqual(expected);
});

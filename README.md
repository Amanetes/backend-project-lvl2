## Difference generator 📲

This utility is used to compare two .json or .yml files and generate a difference report in three output formats: **stylish, plain, json**

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Amanetes/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Amanetes/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/34d105550fcd4ba59d1f/maintainability)](https://codeclimate.com/github/Amanetes/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/34d105550fcd4ba59d1f/test_coverage)](https://codeclimate.com/github/Amanetes/backend-project-lvl2/test_coverage)
[![CI Check](https://github.com/Amanetes/backend-project-lvl2/actions/workflows/main.yml/badge.svg)](https://github.com/Amanetes/backend-project-lvl2/actions/workflows/main.yml)

____

## Installation:

1. Clone this repository 
```bash
git@github.com:Amanetes/backend-project-lvl2.git
```
2. Type `make install` 
```bash
make install
```
3. Type `npm link`
```bash
npm install
```
____

**Program options:**

- Type `gendiff -h` to get help
- Type `gendiff -f` with files to be compared to specify output format
- Type `gendiff -V` to check version

| Option |Description|
| :--- |:----:|
| -V, --version | output the version number|
| -f, --format [type] |output format (default: "stylish")|
| -h, --help |output usage information|

### 1. Compare .json files
[![asciicast](https://asciinema.org/a/VEuUksFXBYQgBiWwpCh9Cx9Bi.svg)](https://asciinema.org/a/VEuUksFXBYQgBiWwpCh9Cx9Bi)
### 2. Compare .yml files
[![asciicast](https://asciinema.org/a/F5n0Tkvd6LVpmYw2ZAqE0ShXO.svg)](https://asciinema.org/a/F5n0Tkvd6LVpmYw2ZAqE0ShXO)
### 3. Compare both .json and .yml files
[![asciicast](https://asciinema.org/a/I4qaLHSaC0X3dhCr6zxj5ffoF.svg)](https://asciinema.org/a/I4qaLHSaC0X3dhCr6zxj5ffoF)
### 4. Stylish Output format
[![asciicast](https://asciinema.org/a/KTHQFE9WdyDUtrrtbt8xCQ9NV.svg)](https://asciinema.org/a/KTHQFE9WdyDUtrrtbt8xCQ9NV)
### 5. Plain Output format
[![asciicast](https://asciinema.org/a/rYLOo3BzqYHkYndvD9l9mT6tL.svg)](https://asciinema.org/a/rYLOo3BzqYHkYndvD9l9mT6tL)
### 6. JSON Output format
[![asciicast](https://asciinema.org/a/aZvc4mc8L4dbCOQoLpWpPcm92.svg)](https://asciinema.org/a/aZvc4mc8L4dbCOQoLpWpPcm92)

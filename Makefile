install:
		npm ci
gendiff:
		node bin/gendiff.js
test:
		npx jest
test-coverage:
		npx jest --coverage --coverageProvider=v8
publish:
		npm publish --dry-run
lint:
		npx eslint .
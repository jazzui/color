
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	@mocha -R spec

lint:
	@jshint --verbose *.json *.js test/*.js

.PHONY: clean test

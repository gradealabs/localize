.PHONY: test
test:
	@./node_modules/.bin/mocha --opts .mocha.opts

.PHONY: build
build:
	@./node_modules/.bin/tsc -p .

.PHONY: clean
clean:
	@rm -fr lib

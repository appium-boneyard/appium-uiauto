JSHINT_BIN=./node_modules/.bin/jshint
JSCS_BIN=./node_modules/.bin/jscs

default: jshint jscs test_unit

jshint:
	@$(JSHINT_BIN) lib uiauto test

jscs:
	@$(JSCS_BIN) lib/** uiauto/** test/** 

test_unit:
	./node_modules/.bin/mocha test/unit

test_functional:
	./node_modules/.bin/mocha test/functional
	make clean_trace

clean_trace:
	rm -rf instrumentscli*.trace

.PHONY: \
	DEFAULT \
	jscs \
	jshint \
	test_unit \
	test_integration \
	clean_trace

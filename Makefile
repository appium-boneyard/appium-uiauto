JSHINT_BIN=./node_modules/.bin/jshint
JSCS_BIN=./node_modules/.bin/jscs

default: jshint jscs

jshint:
	@$(JSHINT_BIN) lib uiauto test

jscs:
	@$(JSCS_BIN) lib test

.PHONY: \
	DEFAULT \
	jscs \
	jshint

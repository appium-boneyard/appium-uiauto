current_dir = $(shell pwd)
xcode_path:="$(shell xcode-select -print-path | sed s/\\/Contents\\/Developer//g)"

DEFAULT: jshint

jshint:
	jshint uiauto

.PHONY: \
	DEFAULT \
	jshint \

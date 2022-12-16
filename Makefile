.PHONY: test
test:
	nvim --headless --noplugin -u test/minimal.vim -c "lua require(\"plenary.test_harness\").test_directory_command('test {minimal_init=\"test/minimal.vim\", sequential=true}')"

.PHONY: test-file
test-file:
	nvim --headless --noplugin -u test/minimal.vim -c "lua require(\"plenary.busted\").run(\"$(FILE)\")"

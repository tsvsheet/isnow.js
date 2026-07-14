.DEFAULT_GOAL := help

# The JavaScript engine's quality gate: eslint (complexity <= 7) and the node
# test runner at 100% line coverage of the residue (src/isnow — the generated
# src/isnowgrammar tree is a build artifact of isnow's grammar and is excluded
# from every gate). The conformance suite runs against ../isnow/conformance
# when present and self-skips otherwise.

.PHONY: help check ci lint test grammars playground

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*## "}{printf "  %-10s %s\n", $$1, $$2}'

check: lint test ## Full quality gate

ci: check ## Full gate as run by CI

lint: ## eslint on the residue and tests
	npm run --silent lint

test: ## node --test with 100% line coverage of the residue; runs the corpus when present
	npm test

grammars: ## Regenerate src/isnowgrammar from ../isnow (needs Docker)
	$(MAKE) -C ../isnow js

playground: ## Build the browser playground bundle
	node playground/build.mjs


build: node_modules
	@./node_modules/.bin/duo --use duo-babel index.js
	@./node_modules/.bin/duo --use duo-myth index.css

clean:
	@rm -rf build components node_modules

server:
	node server.js

node_modules: package.json
	@npm install

.PHONY: build clean server
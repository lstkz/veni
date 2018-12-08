rm -rf ./dist
mkdir dist
yarn run tsc --declaration true --module esnext --outDir "./dist"
yarn run tsc --declaration true --module commonjs --outDir "./dist/commonjs"
cp package.json ./dist/package.json

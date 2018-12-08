rm -rf ./dist
mkdir dist
yarn run tsc --declaration true --module esnext --outDir "./dist"
# yarn run tsc --declaration true --declarationMap true --module commonjs --outDir "./dist"
cp package.json ./dist/package.json

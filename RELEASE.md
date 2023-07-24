# Release

(This probably includes some redundancy, they're just notes to self so I remember how to do this.)

**FIRST**, Update the tutch dependency in package.json.

**SECOND**, change package.json to reflect the new version number.

Then:

```
npm install
npm run build
npm run prettier
git commit -a -m "New version"

npm publish
```

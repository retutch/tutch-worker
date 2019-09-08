Tutch Worker
============

A WebWorker-friendly setup for evaluating [Tutch](https://github.com/avocado-productions/tutch) in the browser.

Usage
-----
The NPM module distribution contains a file, `node_modules/tutch/worker.js`, that can be used as a webworker. This needs to be put at a known URL that will be used by the client.

The NPM module can be used as the _client side_ 

``` typescript
import tutch from 'tutch-worker';

const requestTutch = tutch({
    url: '/node_modules/tutch-worker/worker.js', // Or wherever you put the file
    onSuccess: (just) => console.log(`Success! ${just.length} justification(s)`),
    onError: (msg, loc) => console.log(`Error ${loc ? `at line ${loc.start.line}` : ''}: ${msg}`),
});

requestTutch('this invalid string will be ignored');
requestTutch('proof a: T = begin T end;');
setTimeout(() => requestTutch('delayed invalid string will be checked, later'), 2000);
```
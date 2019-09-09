Tutch Worker
============

[![Build Status](https://travis-ci.org/retutch/tutch-worker.svg?branch=master)](https://travis-ci.org/retutch/tutch-worker?branch=master)
[![NPM Module](https://img.shields.io/npm/v/tutch-worker.svg)](https://www.npmjs.com/package/tutch-worker)


A WebWorker-friendly setup for evaluating [Tutch](https://github.com/avocado-productions/tutch) in the browser.

Usage
-----
The NPM module distribution contains a file, `node_modules/tutch/worker.js`. This file is not designed to be imported; it's designed to be used directly as a webworker. The file needs to be put at a known URL that will be used by the client.

The NPM module can be used to activate the webworker with appropriate callbacks.

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

Example
-------

If you have a version of Python that can run `python -m http.server` to start a HTTP server, then you can easily test Tutch in the browser. Download the [tutch-worker](https://github.com/retutch/tutch-worker) repository, run these commands:

``` shell
npm install
npm start
```

And then visit http://localhost:8000/ in your browser.

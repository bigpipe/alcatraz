# Alcatraz

[![Build Status](https://travis-ci.org/3rd-Eden/alcatraz.png?branch=master)](https://travis-ci.org/3rd-Eden/alcatraz)

Alcatraz is high-security prison for your application code. It does this by
wrapping your front-end code in an extra closure that can terminate hostile
scripts by nuking global variables or introducing them in to the local scope and
there for overriding them.

The primary objective of this module was to ensure that code can run safely
within an `iframe` element in the browser without requiring any code rewriting.
To see it's use for iframe sandboxing, please take a look at:

https://github.com/3rd-Eden/containerization

Current alcatraz does:

- set the `document.domain`.
- try to remove references to iframe parents.
- add error listeners.
- prevent alert, prompt, confirm and other blocking dialogs
- add a `console` object
- add load listeners
- communicate the load, errors and console usage with an assigned method.
- Add a ping/pong method to help with figuring out blocking code.

## Getting started

To create a new prison for your code you need to require the `alcatraz` module.

```js
var Alcatraz = require('alcatraz');
```

The `Alcatraz` constructor allows 3 arguments:

1. `method` a string of the global function name that is used to communicate
   with the jail.
2. `source` the actual code that needs to be locked down, this assumes a string.
3. `domain` this sets the `document.domain` to allow cross domain communication
   if needed. If no argument is give, it defaults to the current
   `document.domain`.

To sandbox the code simply `toString` your alcatraz instance.

```js
var prison = new Alcatraz('myglobalfn', fs.readFileSync('index.js', 'utf-8'));

console.log(prison.toString());
```

## Protocol

The wrapped code communicates with the given method using a simple object based
protocol.

```js
{ type: ping }                // send a ping packet
{ type: load }                // the load event fired
{ type: error }               // critical javascript error
  { scope: 'window.onerror' } // the error has a scope, to trace back the origin
  { args: [] }                // the arguments the error received
{ type: console }             // console method was accessed
  { attach: boolean }         // was a logging/debuggin method
  { scope: method }           // method name used
  { args: [] }                // arguments of the console
```

## License

MIT

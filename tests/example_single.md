# Preval test case

# Hello world

> simple
>
> This is a simple test case as proof of concept

#### CRASH message substring

If you want to indicate that the test is expected to throw inside Preval then you can use this header to tell the test runner to be wanting an error containing that substring to be thrown.

## Options

Test-specific options go here. Just use them as specified. Some do not have an arg.

- implicitThis=window

Consider the implicit `this` keyword to be the `window` object in the browser.
TODO: add same for nodejs and/or other envs.

- skipEval=true

Do not evaluate the result even on success.

- refTest

This enables a special testing mode and output that prints reference tracking details.

## Ref tracking test

The special ref tracking mode stops the run after the first phase1 pass.

It will dump a special annotated source code and for all references it will tell you
- which writes a read can reach
- which writes a write can overwrite
- by which writes a write might be overwritten

To enable this, set the refTest option in the options header (see previous section) or use --refTest from cli.

## Input

Each code fence uses quintuple ticks, has `js` as the first word, and is followed by the virtual path of that code block.
Other files can import that code by that name verbatim.
The `./intro.mjs` file is the standard entry point and should always exist. Anything else is optional.


The `$` symbol is special for testing and acts as a function with side effects. It will not be eliminated and in
tests we can use it to verify the result is still sound, despite any transformations.

`````js filename=./intro.mjs
import {f} from './foo.mjs';

const str = f();

$(str);
`````

`````js filename=./foo.js
export function f() {
  return "Hello, world!";
}
`````

## Output

`````js filename=./intro.mjs
$('Hello, world!')
`````

`````js filename=./intro.mjs
`````

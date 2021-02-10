# Preval test case

# Hello world

> simple
>
> This is a simple test case as proof of concept

##TODO

### CRASH message substring

If you want to indicate that the test is expected to throw inside Preval then you can use this header to tell the test runner to be wanting an error containing that substring to be thrown.

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

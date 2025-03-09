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

- pcode

This enables a special testing mode for testing and compiling pcode.

It will run preval on the input code until after the first phase1 and then test if the function is pcode compilable.

If it can be compiled, it will compile it, dump the "pcode", and compare running it against running the original func.

- seed N

Sets the seed for Math.random() inlining. Defaults to 1. Disable by setting it to 0.

Not sure this is very useful to configure to other values but you can set this to any 16bit int.

It seeds a consistent prng such that test cases always have the same outcome but each call to Math.random() still gets a different value. It uses the simple xorshift algorithm to generate numbers, which is totally fine for this use case.

- globals: x y z

This way you can ignore implicit globals. If your test includes any implicit globals and you don't care about them, you can squash them getting reported.

This helps clean up test cases and find BAD cases more easily.

## Ref tracking test

The special ref tracking mode stops the run after the first phase1 pass.

It will dump a special annotated source code and for all references it will tell you
- which writes a read can reach
- which writes a write can overwrite
- by which writes a write might be overwritten

To enable this, set the refTest option in the options header (see previous section) or use --refTest from cli.

## Pcode test

In this case it will run the pre/normalization step all the way to phase 1.1 and then stop.

The test case will serialize the pcode for any function that was pcode compiled at that point.

It will then execute the pcode with the pcode executor and also the original function with eval (the assumption is that if the function can be pcode-compiled then the function must be safe to eval). The test case will display the result for both cases for a couple of predetermined arguments so you can assert them being equal.

The same pcode will also be executed for primitives called in the test so you can test specific values as well.

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

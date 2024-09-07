# Preval test case

# indirect_inf_recursion.md

> Pcode > Indirect inf recursion
>
> Recursion problems

This is an infinite loop. It should not throw Preval in an endless loop.

## Options

- pcode

## Input

`````js filename=intro
function f(n) {
  return g(n);
}
function g(n) {
  return f(n+1);
}
$(f(0));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  return g(n);
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  return f(n$1 + 1);
};
$(f(0));
`````

## Pcode output

`````fileintro

`````



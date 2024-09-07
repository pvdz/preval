# Preval test case

# eq.md

> Pcode > Eq
>
> Testing the inlining of array mutations

## Options

- pcode

## Input

`````js filename=intro
const f = function () {
  arr[0] = 1;
};
const arr = [];
$(f);
f();
$(arr);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  arr[0] = 1;
};
const arr = [];
$(f);
f();
$(arr);
`````

## Pcode output

`````fileintro

`````



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


## Pcode output


`````fileintro

`````




## Todos triggered


None


## Pcode result



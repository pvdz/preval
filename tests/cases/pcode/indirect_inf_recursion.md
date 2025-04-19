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


## Pcode output


`````fileintro

`````




## Todos triggered


None


## Pcode result

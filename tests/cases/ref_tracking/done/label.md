# Preval test case

# label.md

> Ref tracking > Done > Label
> 
> A break that travels through two finally nodes before reaching its label.
>
> Minimal test case where at some point the ref tracking claimed the last x
> might read the initial assignment. Which we can clearly see is never the case.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
A: {
  x = 2;
  if ($) throw 'fail';
  else break A;
}
$(x); // x=2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
A___7__: /*8*/ {
  x___12__ = 2;
  if ($) {
    /*15*/ throw `fail`;
  } /*19*/ else {
    break A___21__;
  }
}
$(x___25__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 25          | none           | 12
  - w @12      | ########## | 25          | 4              | none
  - r @25      | 4,12

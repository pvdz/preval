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
let /*___4__*/ x = 1;
/*___7__*/ A: /*8~21*/ {
  /*___12__*/ x = 2;
  if ($) {
    /*15~18*/ throw `fail`;
  } /*19~21*/ else {
    break /*___21__*/ A;
  }
}
$(/*___25__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 25          | 4              | none
  - r @25      | 12

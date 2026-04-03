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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ A: /*8~21*/ {
  /* stmt(9): */ /*___12__*/ x = 2;
  /* stmt(13): */ if ($) {
    /*15~18*/ /* stmt(16): */ throw `fail`;
  } /*19~21*/ else {
    /* stmt(20): */ break /*___21__*/ A;
  }
}
/* stmt(22): */ $(/*___25__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 25          | 4              | none
  - r @25      | 12

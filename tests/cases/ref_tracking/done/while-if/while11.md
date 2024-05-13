# Preval test case

# while11.md

> Ref tracking > Done > While-if > While11
>
> A let binding defined in an outer block than the nested while
> 
> A regression

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
loopStop: {
  if ($) {}
  else {
    break loopStop;
  }
}
if ($) {
  $(x);
} else {}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
loopStop___7__: /*8*/ {
  if ($) {
    /*11*/
  } /*12*/ else {
    break loopStop___14__;
  }
}
if ($) {
  /*17*/ $(x___21__);
} /*22*/ else {
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | none
  - r @21      | 4

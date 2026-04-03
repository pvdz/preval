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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ loopStop: /*8~14*/ {
  /* stmt(9): */ if ($) {
    /*11~11*/
  } /*12~14*/ else {
    /* stmt(13): */ break /*___14__*/ loopStop;
  }
}
/* stmt(15): */ if ($) {
  /*17~21*/ /* stmt(18): */ $(/*___21__*/ x);
} /*22~22*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | none
  - r @21      | 4

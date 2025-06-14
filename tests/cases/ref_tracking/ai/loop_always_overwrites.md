# Preval test case

# loop_always_overwrites.md

> Ref tracking > Ai > Loop always overwrites
>
> This test checks that if a loop always assigns to x, the initial write is pruned.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (cond) {
  x = 2;
}
$(x);
// # Expected: Only x=2 is possible for the final read if the loop always runs at least once and always assigns.
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~17*/ if (/*___10__*/ cond) {
    /*11~15*/ /*___15__*/ x = 2;
  } /*16~17*/ else {
    break;
  }
}
$(/*___21__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | 15
  - w @15      | ########## | 21          | 4,15           | 15
  - r @21      | 4,15

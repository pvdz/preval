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
let x___4__ = 1;
while (true) {
  /*8*/ if (cond___10__) {
    /*11*/ x___15__ = 2;
  } /*16*/ else {
    break;
  }
}
$(x___21__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | 15
  - w @15      | ########## | 21          | 4,15           | 15
  - r @21      | 4,15

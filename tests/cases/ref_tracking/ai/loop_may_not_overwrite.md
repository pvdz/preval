# Preval test case

# loop_may_not_overwrite.md

> Ref tracking > Ai > Loop may not overwrite
>
> This test checks that if a loop may or may not assign to x, the initial write is merged.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (cond) {
  if (branch) {
    x = 2;
  }
}
$(x);
// Expected: Both x=1 and x=2 are possible for the final read.
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if (cond___10__) {
    /*11*/ if (branch___13__) {
      /*14*/ x___18__ = 2;
    } /*19*/ else {
    }
  } /*20*/ else {
    break;
  }
}
$(x___25__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 25          | none           | 18
  - w @18      | ########## | 25          | 4,18           | 18
  - r @25      | 4,18

# Preval test case

# loop_conditional_assignment.md

> Ref tracking > Ai > Loop conditional assignment
>
> This test checks how ref tracking and mutatedRefs handle a variable that is only conditionally assigned in a loop.

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
// Expected: If branch can be false, x=1 may be observable after the loop. If mutatedRefs is too broad, x=1 will be pruned even when it shouldn't be.
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~21*/ if (/*___10__*/ cond) {
    /*11~19*/ if (/*___13__*/ branch) {
      /*14~18*/ /*___18__*/ x = 2;
    } /*19~19*/ else {
    }
  } /*20~21*/ else {
    break;
  }
}
$(/*___25__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 25          | none           | 18
  - w @18      | ########## | 25          | 4,18           | 18
  - r @25      | 4,18

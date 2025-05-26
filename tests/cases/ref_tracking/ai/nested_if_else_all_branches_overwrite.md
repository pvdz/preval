# Preval test case

# nested_if_else_all_branches_overwrite.md

> Ref tracking > Ai > Nested if else all branches overwrite
>
> This test checks that if all branches of a nested if/else assign to x, the initial write is pruned.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (cond) {
  if (branch) {
    x = 2;
  } else {
    x = 3;
  }
}
$(x);
// After the loop, only x=2 and x=3 should be possible for the final read.
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
      x___23__ = 3;
    }
  } /*24*/ else {
    break;
  }
}
$(x___29__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 29          | none           | 18,23
  - w @18      | ########## | 29          | 4,18,23        | 18,23
  - w @23      | ########## | 29          | 4,18,23        | 18,23
  - r @29      | 4,18,23

# Preval test case

# if_else_all_branches_overwrite.md

> Ref tracking > Ai > If else all branches overwrite
>
> This test checks that if all branches of an if/else assign to x, the initial write is pruned.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if (cond) {
  x = 2;
} else {
  x = 3;
}
$(x);
// Expected: Only x=2 and x=3 are possible for the final read.
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if (cond___7__) {
  /*8*/ x___12__ = 2;
  $(x___16__);
} /*17*/ else {
  x___21__ = 3;
  $(x___25__);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12,21
  - w @12      | ########## | 16          | 4              | none
  - r @16      | 12
  - w @21      | ########## | 25          | 4              | none
  - r @25      | 21

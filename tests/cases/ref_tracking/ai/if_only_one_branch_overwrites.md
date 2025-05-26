# Preval test case

# if_only_one_branch_overwrites.md

> Ref tracking > Ai > If only one branch overwrites
>
> This test checks that if only one branch of an if assigns to x, the initial write is merged.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if (cond) {
  x = 2;
}
$(x);
// Expected: Both x=1 and x=2 are possible for the final read.
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if (cond___7__) {
  /*8*/ x___12__ = 2;
  $(x___16__);
} /*17*/ else {
  $(x___21__);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | 12
  - w @12      | ########## | 16          | 4              | none
  - r @16      | 12
  - r @21      | 4

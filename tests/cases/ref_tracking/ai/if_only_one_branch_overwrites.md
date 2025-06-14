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
let /*___4__*/ x = 1;
if (/*___7__*/ cond) {
  /*8~16*/ /*___12__*/ x = 2;
  $(/*___16__*/ x);
} /*17~21*/ else {
  $(/*___21__*/ x);
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

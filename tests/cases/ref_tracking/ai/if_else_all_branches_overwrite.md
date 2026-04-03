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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ if (/*___7__*/ cond) {
  /*8~16*/ /* stmt(9): */ /*___12__*/ x = 2;
  /* stmt(13): */ $(/*___16__*/ x);
} /*17~25*/ else {
  /* stmt(18): */ /*___21__*/ x = 3;
  /* stmt(22): */ $(/*___25__*/ x);
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

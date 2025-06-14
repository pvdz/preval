# Preval test case

# nested_if_else_all_branches_overwrite_norm.md

> Ref tracking > Ai > Nested if else all branches overwrite norm
>
> This test checks that if all branches of a nested if/else assign to x, the initial write is pruned.

## Options

- refTest

## Input

`````js filename=intro
        let x = 1;
while (true) {
  if (cond) {
    if (branch) {
      x = 2;
    } else {
      x = 3;
    }
  } else {
    break;
  }
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~25*/ if (/*___10__*/ cond) {
    /*11~23*/ if (/*___13__*/ branch) {
      /*14~18*/ /*___18__*/ x = 2;
    } /*19~23*/ else {
      /*___23__*/ x = 3;
    }
  } /*24~25*/ else {
    break;
  }
}
$(/*___29__*/ x);
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

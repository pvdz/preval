# Preval test case

# loop_boundary_base.md

> Ref tracking > Done > While-if > Loop boundary base

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  $(x);
  break;
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
$(x___9__);
$(x___13__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,13        | none           | none
  - r @9       | 4
  - r @13      | 4

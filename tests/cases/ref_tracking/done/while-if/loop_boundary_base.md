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
while (true) {
  /*8*/ $(x___12__);
  break;
}
$(x___17__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,17       | none           | none
  - r @12      | 4
  - r @17      | 4

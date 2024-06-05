# Preval test case

# loop_boundary_base_if.md

> Ref tracking > Done > While-if > Loop boundary base if

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  if ($) $(x);
  break;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
if ($) {
  /*8*/ $(x___12__);
} /*13*/ else {
}
$(x___17__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,17       | none           | none
  - r @12      | 4
  - r @17      | 4

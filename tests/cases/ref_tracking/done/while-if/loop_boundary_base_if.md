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
  $(x___16__);
} /*17*/ else {
  $(x___21__);
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,16,21    | none           | none
  - r @12      | 4
  - r @16      | 4
  - r @21      | 4

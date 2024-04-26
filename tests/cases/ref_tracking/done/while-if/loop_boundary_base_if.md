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
while (true) {
  /*8*/ if ($) {
    /*11*/ $(x___15__);
  } /*16*/ else {
  }
  break;
}
$(x___21__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | none
  - r @15      | none (TDZ?)
  - r @21      | 4

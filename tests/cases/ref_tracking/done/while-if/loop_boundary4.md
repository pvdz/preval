# Preval test case

# loop_boundary4.md

> Ref tracking > Done > While-if > Loop boundary4
>
> This case is for the conditional break where the body always overwrites

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  x = 6;
  $(x); // 6
  if ($) {
    break;
  }
}
$(x); // 5 or 6
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
while (true) {
  /*8*/ x___12__ = 6;
  $(x___16__);
  if ($) {
    /*19*/ break;
  } /*21*/ else {
  }
}
$(x___25__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 25          | none           | none
  - w @12      | ########## | 16          | none           | none
  - r @16      | 12
  - r @25      | 4

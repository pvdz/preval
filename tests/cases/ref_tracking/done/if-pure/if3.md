# Preval test case

# if3.md

> Ref tracking > Done > If-pure > If3
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/
} /*9*/ else {
  $(x___13__, 3);
}
x___18__ = 4;
$(x___22__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | none
  - r @13      | none (TDZ?)
  - w @18      | ########## | 22          | none           | none
  - r @22      | 18

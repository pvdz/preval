# Preval test case

# if2.md

> Ref tracking > Done > If-pure > If2
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x, 2);
  } else {
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
  /*8*/ $(x___12__, 2);
} /*14*/ else {
}
x___18__ = 4;
$(x___22__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | none
  - r @12      | none (TDZ?)
  - w @18      | ########## | 22          | none           | none
  - r @22      | 18

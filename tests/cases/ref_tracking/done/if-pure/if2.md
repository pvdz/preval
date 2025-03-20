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


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 18
  - r @12      | 4
  - w @18      | ########## | 22          | 4              | none
  - r @22      | 18

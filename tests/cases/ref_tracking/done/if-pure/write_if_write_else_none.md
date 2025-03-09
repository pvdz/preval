# Preval test case

# write_if_write_else_none.md

> Ref tracking > Done > If-pure > Write if write else none
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = $(1);
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/ x___14__ = $(1);
  $(x___18__);
} /*19*/ else {
  $(x___23__);
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 23          | none           | 14
  - w @14      | ########## | 18          | 4              | none
  - r @18      | 14
  - r @23      | 4

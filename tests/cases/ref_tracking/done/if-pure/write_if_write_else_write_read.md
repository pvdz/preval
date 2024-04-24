# Preval test case

# write_if_write_else_write_read.md

> Ref tracking > Done > If-pure > Write if write else write read
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = $(1);
if ($) {
  x = $(2);
} else {
  x = $(3);
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
if ($) {
  /*10*/ x___16__ = $(2);
} /*17*/ else {
  x___23__ = $(3);
}
$(x___27__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27          | none           | 16,23
  - w @16      | ########## | not read    | 4              | none
  - w @23      | ########## | not read    | 4              | none
  - r @27      | 4

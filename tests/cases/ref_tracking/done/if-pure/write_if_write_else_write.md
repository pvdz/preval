# Preval test case

# write_if_write_else_write.md

> Ref tracking > Done > If-pure > Write if write else write
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = $(1);
if ($) {
  x = $(2);
  $(x);
} else {
  x = $(3);
  $(x);
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
if ($) {
  /*10*/ x___16__ = $(2);
  $(x___20__);
} /*21*/ else {
  x___27__ = $(3);
  $(x___31__);
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 16,27
  - w @16      | ########## | 20          | 4              | none
  - r @20      | 16
  - w @27      | ########## | 31          | 4              | none
  - r @31      | 27

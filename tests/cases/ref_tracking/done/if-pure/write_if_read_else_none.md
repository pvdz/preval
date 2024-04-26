# Preval test case

# write_if_read_else_none.md

> Ref tracking > Done > If-pure > Write if read else none
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = $(1);
if ($) {
  $(x);
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
if ($) {
  /*10*/ $(x___14__);
} /*15*/ else {
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | none
  - r @14      | none (TDZ?)

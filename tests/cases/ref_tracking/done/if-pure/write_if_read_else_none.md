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
let /*___4__*/ x = $(1);
if ($) {
  /*10~14*/ $(/*___14__*/ x);
} /*15~15*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 14          | none           | none
  - r @14      | 4

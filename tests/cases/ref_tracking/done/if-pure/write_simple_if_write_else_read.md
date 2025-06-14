# Preval test case

# write_simple_if_write_else_read.md

> Ref tracking > Done > If-pure > Write simple if write else read
>
> Ref tracking cases
>
> In this case the init is a Simple and can be moved inside

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
if ($) {
  /*8~18*/ /*___14__*/ x = $(2);
  $(/*___18__*/ x);
} /*19~23*/ else {
  $(/*___23__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 23          | none           | 14
  - w @14      | ########## | 18          | 4              | none
  - r @18      | 14
  - r @23      | 4

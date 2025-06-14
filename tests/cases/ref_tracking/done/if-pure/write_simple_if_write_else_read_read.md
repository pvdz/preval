# Preval test case

# write_simple_if_write_else_read_read.md

> Ref tracking > Done > If-pure > Write simple if write else read read
>
> Ref tracking cases
>
> In this case the init is a Simple and can be moved insid. The read after can be moved into each branch too, which then allows simplification

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
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
if ($) {
  /*8~22*/ /*___14__*/ x = $(2);
  $(/*___18__*/ x);
  $(/*___22__*/ x);
} /*23~31*/ else {
  $(/*___27__*/ x);
  $(/*___31__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27,31       | none           | 14
  - w @14      | ########## | 18,22       | 4              | none
  - r @18      | 14
  - r @22      | 14
  - r @27      | 4
  - r @31      | 4

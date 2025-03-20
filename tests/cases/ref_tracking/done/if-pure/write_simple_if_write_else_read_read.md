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
let x___4__ = 1;
if ($) {
  /*8*/ x___14__ = $(2);
  $(x___18__);
  $(x___22__);
} /*23*/ else {
  $(x___27__);
  $(x___31__);
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27,31       | none           | 14
  - w @14      | ########## | 18,22       | 4              | none
  - r @18      | 14
  - r @22      | 14
  - r @27      | 4
  - r @31      | 4

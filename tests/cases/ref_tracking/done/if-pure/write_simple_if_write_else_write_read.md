# Preval test case

# write_simple_if_write_else_write_read.md

> Ref tracking > Done > If-pure > Write simple if write else write read
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
  x = $(3);
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
  x___29__ = $(3);
  $(x___33__);
  $(x___37__);
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 14,29
  - w @14      | ########## | 18,22       | 4              | none
  - r @18      | 14
  - r @22      | 14
  - w @29      | ########## | 33,37       | 4              | none
  - r @33      | 29
  - r @37      | 29

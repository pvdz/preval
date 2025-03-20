# Preval test case

# write_simple_if_write_else_write.md

> Ref tracking > Done > If-pure > Write simple if write else write
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
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/ x___14__ = $(2);
  $(x___18__);
} /*19*/ else {
  x___25__ = $(3);
  $(x___29__);
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 14,25
  - w @14      | ########## | 18          | 4              | none
  - r @18      | 14
  - w @25      | ########## | 29          | 4              | none
  - r @29      | 25

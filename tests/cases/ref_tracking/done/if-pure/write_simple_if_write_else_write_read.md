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
let /*___4__*/ x = 1;
if ($) {
  /*8~22*/ /*___14__*/ x = $(2);
  $(/*___18__*/ x);
  $(/*___22__*/ x);
} /*23~37*/ else {
  /*___29__*/ x = $(3);
  $(/*___33__*/ x);
  $(/*___37__*/ x);
}
`````


## Todos triggered


None


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

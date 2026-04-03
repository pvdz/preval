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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ if ($) {
  /*8~18*/ /* stmt(9): */ /*___14__*/ x = $(2);
  /* stmt(15): */ $(/*___18__*/ x);
} /*19~23*/ else {
  /* stmt(20): */ $(/*___23__*/ x);
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

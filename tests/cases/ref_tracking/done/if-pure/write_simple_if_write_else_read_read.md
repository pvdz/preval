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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ if ($) {
  /*8~22*/ /* stmt(9): */ /*___14__*/ x = $(2);
  /* stmt(15): */ $(/*___18__*/ x);
  /* stmt(19): */ $(/*___22__*/ x);
} /*23~31*/ else {
  /* stmt(24): */ $(/*___27__*/ x);
  /* stmt(28): */ $(/*___31__*/ x);
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

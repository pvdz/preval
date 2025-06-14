# Preval test case

# write_if_write_else_none.md

> Ref tracking > Done > If-pure > Write if write else none
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = $(1);
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
if ($) {
  /*8~18*/ /*___14__*/ x = $(1);
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

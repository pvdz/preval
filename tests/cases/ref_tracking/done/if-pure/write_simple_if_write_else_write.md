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
let /*___4__*/ x = 1;
if ($) {
  /*8~18*/ /*___14__*/ x = $(2);
  $(/*___18__*/ x);
} /*19~29*/ else {
  /*___25__*/ x = $(3);
  $(/*___29__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 14,25
  - w @14      | ########## | 18          | 4              | none
  - r @18      | 14
  - w @25      | ########## | 29          | 4              | none
  - r @29      | 25

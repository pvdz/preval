# Preval test case

# write_if_write_else_write.md

> Ref tracking > Done > If-pure > Write if write else write
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = $(1);
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
let /*___4__*/ x = $(1);
if ($) {
  /*10~20*/ /*___16__*/ x = $(2);
  $(/*___20__*/ x);
} /*21~31*/ else {
  /*___27__*/ x = $(3);
  $(/*___31__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 16,27
  - w @16      | ########## | 20          | 4              | none
  - r @20      | 16
  - w @27      | ########## | 31          | 4              | none
  - r @31      | 27

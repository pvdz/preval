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
/* stmt(3): */ let /*___4__*/ x = $(1);
/* stmt(8): */ if ($) {
  /*10~20*/ /* stmt(11): */ /*___16__*/ x = $(2);
  /* stmt(17): */ $(/*___20__*/ x);
} /*21~31*/ else {
  /* stmt(22): */ /*___27__*/ x = $(3);
  /* stmt(28): */ $(/*___31__*/ x);
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

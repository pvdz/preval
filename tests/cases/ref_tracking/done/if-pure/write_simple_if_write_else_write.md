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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ if ($) {
  /*8~18*/ /* stmt(9): */ /*___14__*/ x = $(2);
  /* stmt(15): */ $(/*___18__*/ x);
} /*19~29*/ else {
  /* stmt(20): */ /*___25__*/ x = $(3);
  /* stmt(26): */ $(/*___29__*/ x);
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

# Preval test case

# write_write.md

> Ref tracking > Done > Root > Write write
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
x___13__ = $(2);
$(x___17__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 13
  - w @13      | ########## | 17          | 4              | none
  - r @17      | 13

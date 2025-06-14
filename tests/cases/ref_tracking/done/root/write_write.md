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
let /*___4__*/ x = $(1);
/*___13__*/ x = $(2);
$(/*___17__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 13
  - w @13      | ########## | 17          | 4              | none
  - r @17      | 13

# Preval test case

# write_read_write.md

> Ref tracking > Done > Root > Write read write
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = $(1);
/* stmt(8): */ $(/*___11__*/ x);
/* stmt(12): */ /*___17__*/ x = $(2);
/* stmt(18): */ $(/*___21__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11          | none           | 17
  - r @11      | 4
  - w @17      | ########## | 21          | 4              | none
  - r @21      | 17

# Preval test case

# simple.md

> Ref tracking > Done > Root > Simple
>
> Simple case

## Options

- refTest

## Input

`````js filename=intro
let x = 10;
$(x);
x = 20;
x = 30;
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 10;
$(/*___9__*/ x);
/*___13__*/ x = 20;
/*___17__*/ x = 30;
$(/*___21__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 13
  - r @9       | 4
  - w @13      | ########## | not read    | 4              | 17
  - w @17      | ########## | 21          | 13             | none
  - r @21      | 17

# Preval test case

# while7.md

> Ref tracking > Done > While-break > While7
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  $(x);
  x = 2;
  break;
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
x___13__ = 2;
$(x___17__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 13
  - r @9       | 4
  - w @13      | ########## | 17          | 4              | none
  - r @17      | 13

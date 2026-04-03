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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ /*___13__*/ x = 2;
/* stmt(14): */ $(/*___17__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 13
  - r @9       | 4
  - w @13      | ########## | 17          | 4              | none
  - r @17      | 13

# Preval test case

# while6.md

> Ref tracking > Done > While-break > While6
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  $(x);
  break;
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ $(/*___13__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,13        | none           | none
  - r @9       | 4
  - r @13      | 4

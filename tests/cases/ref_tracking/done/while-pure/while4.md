# Preval test case

# while4.md

> Ref tracking > Done > While-pure > While4
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
}
$(x); // unreachable
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4,12           | 12

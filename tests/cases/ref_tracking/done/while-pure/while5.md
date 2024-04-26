# Preval test case

# while5.md

> Ref tracking > Done > While-pure > While5
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  break;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
  break;
}
$(x___17__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 17          | none           | none
  - w @12      | ########## | not read    | none           | none
  - r @17      | 4

# Preval test case

# while1.md

> Ref tracking > Done > While-pure > While1
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  $(x); // x=2
}
$(x); // unreachable, else x=1 2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
  $(x___16__);
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | 16          | 4,12           | 12
  - r @16      | 12

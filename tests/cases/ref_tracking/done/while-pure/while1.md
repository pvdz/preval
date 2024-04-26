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
  $(x);
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
  $(x___16__);
}
$(x___20__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 20          | none           | none
  - w @12      | ########## | 16          | none           | none
  - r @16      | 12
  - r @20      | 4

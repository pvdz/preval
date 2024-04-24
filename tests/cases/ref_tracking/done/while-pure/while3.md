# Preval test case

# while3.md

> Ref tracking > Done > While-pure > While3
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
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ $(x___12__);
  x___16__ = 2;
}
$(x___20__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,20       | none           | 16
  - r @12      | 4
  - w @16      | ########## | not read    | 4              | none
  - r @20      | 4

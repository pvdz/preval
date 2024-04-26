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
  - w @4       | ########## | 20          | none           | none
  - r @12      | none (TDZ?)
  - w @16      | ########## | not read    | none           | none
  - r @20      | 4

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
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ x___12__ = 2;
}
$(x___16__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16          | none           | none
  - w @12      | ########## | not read    | none           | none
  - r @16      | 4

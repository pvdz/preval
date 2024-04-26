# Preval test case

# while7.md

> Ref tracking > Done > While-pure > While7
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
while (true) {
  /*8*/ $(x___12__);
  x___16__ = 2;
  break;
}
$(x___21__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | none
  - r @12      | none (TDZ?)
  - w @16      | ########## | not read    | none           | none
  - r @21      | 4

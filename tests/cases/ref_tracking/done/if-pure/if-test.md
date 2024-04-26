# Preval test case

# if-test.md

> Ref tracking > Done > If-pure > If-test
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if (x) {
    x = 2;
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if (x___7__) {
  /*8*/ x___12__ = 2;
} /*13*/ else {
  $(x___17__, 3);
}
x___22__ = 4;
$(x___26__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 7           | none           | none
  - r @7       | 4
  - w @12      | ########## | not read    | none           | none
  - r @17      | none (TDZ?)
  - w @22      | ########## | 26          | none           | none
  - r @26      | 22

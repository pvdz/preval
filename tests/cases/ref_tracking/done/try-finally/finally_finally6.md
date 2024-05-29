# Preval test case

# finally_finally6.md

> Ref tracking > Done > Try-finally > Finally finally6

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    x = 2;
  } finally {
    x = 3;
  }
} finally {
  $(x);       // x=1 2 3
}
$(x);         // x=3
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  try /*9*/ {
    x___13__ = 2;
  } finally /*14*/ {
    x___18__ = 3;
  }
} finally /*19*/ {
  $(x___23__);
}
$(x___27__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 23          | none           | 13,18
  - w @13      | ########## | 23          | 4              | 18
  - w @18      | ########## | 23,27       | 4,13           | none
  - r @23      | 4,13,18
  - r @27      | 18

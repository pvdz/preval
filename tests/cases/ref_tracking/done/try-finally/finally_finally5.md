# Preval test case

# finally_finally5.md

> Ref tracking > Done > Try-finally > Finally finally5

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    $(x);     // x=1
    x = 2;
    $(x);     // x=2
  } finally {
    $(x);     // x=1 2
    x = 3;
    $(x);     // x=3
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
    $(x___13__);
    x___17__ = 2;
    $(x___21__);
  } finally /*22*/ {
    $(x___26__);
    x___30__ = 3;
    $(x___34__);
  }
} finally /*35*/ {
  $(x___39__);
}
$(x___43__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,26,39    | none           | 17,30
  - r @13      | 4
  - w @17      | ########## | 21,26,39    | 4              | 30
  - r @21      | 17
  - r @26      | 4,17
  - w @30      | ########## | 34,39,43    | 4,17           | none
  - r @34      | 30
  - r @39      | 4,17,30
  - r @43      | 30

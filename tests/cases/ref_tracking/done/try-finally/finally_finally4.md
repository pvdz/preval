# Preval test case

# finally_finally4.md

> Ref tracking > Done > Try-finally > Finally finally4

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);       // x=1
  x = 2;
  try {
    $(x);     // x=2
    x = 3;
  } finally {
    $(x);     // x=2 3
    x = 4;
    $(x);     // x=4
  }
} finally {
  $(x);       // x=1 2 3 4
}
$(x);         // x=4
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
  try /*17*/ {
    $(x___21__);
    x___25__ = 3;
  } finally /*26*/ {
    $(x___30__);
    x___34__ = 4;
    $(x___38__);
  }
} finally /*39*/ {
  $(x___43__);
}
$(x___47__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,43       | none           | 15
  - r @11      | 4
  - w @15      | ########## | 21,30,43    | 4              | 25,34
  - r @21      | 15
  - w @25      | ########## | 30,43       | 15             | 34
  - r @30      | 15,25
  - w @34      | ########## | 38,43,47    | 15,25          | none
  - r @38      | 34
  - r @43      | 4,15,25,34
  - r @47      | 34

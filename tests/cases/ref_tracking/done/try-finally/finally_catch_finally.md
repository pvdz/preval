# Preval test case

# finally_catch_finally.md

> Ref tracking > Done > Try-finally > Finally catch finally

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
  }
} catch {
  $(x);       // x=1 2 3 4
  x = 5;
} finally {
  $(x);       // x=1 2 3 4 5
}
$(x);         // x=4 5
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  try /*9*/ {
    $(x___13__);
    x___17__ = 2;
    try /*19*/ {
      $(x___23__);
      x___27__ = 3;
    } finally /*28*/ {
      $(x___32__);
      x___36__ = 4;
    }
  } catch (e___38__) /*39*/ {
    $(x___43__);
    x___47__ = 5;
  }
} finally /*48*/ {
  $(x___52__);
}
$(x___56__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,43,52    | none           | 17,47
  - r @13      | 4
  - w @17      | ########## | 23,32,43,52 | 4              | 27,36,47
  - r @23      | 17
  - w @27      | ########## | 32,43,52    | 17             | 36,47
  - r @32      | 17,27
  - w @36      | ########## | 43,52,56    | 17,27          | 47
  - r @43      | 4,17,27,36
  - w @47      | ########## | 52,56       | 4,17,27,36     | none
  - r @52      | 4,17,27,36,47
  - r @56      | 36,47

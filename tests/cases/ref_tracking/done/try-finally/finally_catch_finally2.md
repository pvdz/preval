# Preval test case

# finally_catch_finally2.md

> Ref tracking > Done > Try-finally > Finally catch finally2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
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
  } catch {
    $(x);       // x=1 2 3 4
    x = 5;
    $(x);       // x=5
  }
} finally {
  $(x);         // x=1 2 3 4 5
}
$(x);           // x=4 5
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
      $(x___40__);
    }
  } catch (e___42__) /*43*/ {
    $(x___47__);
    x___51__ = 5;
    $(x___55__);
  }
} finally /*56*/ {
  $(x___60__);
}
$(x___64__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,47,60    | none           | 17,51
  - r @13      | 4
  - w @17      | ########## | 23,32,47,60 | 4              | 27,36,51
  - r @23      | 17
  - w @27      | ########## | 32,47,60    | 17             | 36,51
  - r @32      | 17,27
  - w @36      | ########## | 40,47,60,64 | 17,27          | 51
  - r @40      | 36
  - r @47      | 4,17,27,36
  - w @51      | ########## | 55,60,64    | 4,17,27,36     | none
  - r @55      | 51
  - r @60      | 4,17,27,36,51
  - r @64      | 36,51

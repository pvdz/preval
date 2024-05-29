# Preval test case

# try_catch_finally_split.md

> Ref tracking > Done > Try-catch-finally > Try catch finally split

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    $(x);      // x=1
    x = 2;
  } catch (e) {
    $(x);      // x=1 2
    x = 3;
  }
  $(x);        // x=2 3
} finally {
  $(x);        // x=1 2 3 
  if ($1) {
    x = 4;
  }
}
$(x);          // x=2 3 4. not 1: a throw in the Catch does not reach here
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  try /*9*/ {
    $(x___13__);
    x___17__ = 2;
  } catch (e___19__) /*20*/ {
    $(x___24__);
    x___28__ = 3;
  }
  $(x___32__);
} finally /*33*/ {
  $(x___37__);
  if ($1) {
    /*40*/ x___44__ = 4;
  } /*45*/ else {
  }
}
$(x___49__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,24,37    | none           | 17,28,44
  - r @13      | 4
  - w @17      | ########## | 24,32,37,49 | 4              | 28,44
  - r @24      | 4,17
  - w @28      | ########## | 32,37,49    | 4,17           | 44
  - r @32      | 17,28
  - r @37      | 4,17,28
  - w @44      | ########## | 49          | 4,17,28        | none
  - r @49      | 17,28,44

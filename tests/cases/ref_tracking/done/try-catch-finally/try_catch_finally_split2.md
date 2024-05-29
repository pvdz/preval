# Preval test case

# try_catch_finally_split2.md

> Ref tracking > Done > Try-catch-finally > Try catch finally split2

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
    $(x);      // x=1 2. but if it throws then 1 won't reach the end
    x = 3;
  }
} finally {
  $(x);        // x=1 2 3. would trap a throw inside the catch
}
$(x);          // x=2 3. if the catch throws then that won't reach here.
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
} finally /*29*/ {
  $(x___33__);
}
$(x___37__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,24,33    | none           | 17,28
  - r @13      | 4
  - w @17      | ########## | 24,33,37    | 4              | 28
  - r @24      | 4,17
  - w @28      | ########## | 33,37       | 4,17           | none
  - r @33      | 4,17,28
  - r @37      | 17,28

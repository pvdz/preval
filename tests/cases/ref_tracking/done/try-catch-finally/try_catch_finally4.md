# Preval test case

# try_catch_finally4.md

> Ref tracking > Done > Try-catch-finally > Try catch finally4

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} catch {
  $(a); // can observe 1 2
  a = 3;
} finally {
  $(a); // can observe 1 2 3
  a = 4;
}
$(a); // x=4. anything else is an uncaught throw.
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
try /*7*/ {
  try /*9*/ {
    $(a___13__);
    a___17__ = 2;
  } catch (e___19__) /*20*/ {
    $(a___24__);
    a___28__ = 3;
  }
} finally /*29*/ {
  $(a___33__);
  a___37__ = 4;
}
$(a___41__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 13,24,33    | none           | 17,28,37
  - r @13      | 4
  - w @17      | ########## | 24,33       | 4              | 28,37
  - r @24      | 4,17
  - w @28      | ########## | 33          | 4,17           | 37
  - r @33      | 4,17,28
  - w @37      | ########## | 41          | 4,17,28        | none
  - r @41      | 37

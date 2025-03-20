# Preval test case

# try_catch4.md

> Ref tracking > Done > Try-catch > Try catch4

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $();
} catch (e) {
  $();
  x = 2;
}
$(x); // x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $();
} catch (e___12__) /*13*/ {
  $();
  x___20__ = 2;
}
$(x___24__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24          | none           | 20
  - w @20      | ########## | 24          | 4              | none
  - r @24      | 4,20

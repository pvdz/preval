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
let /*___4__*/ x = 1;
try /*7~10*/ {
  $();
} catch (/*___12__*/ e) /*13~20*/ {
  $();
  /*___20__*/ x = 2;
}
$(/*___24__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24          | none           | 20
  - w @20      | ########## | 24          | 4              | none
  - r @24      | 4,20

e:
  - w @12      | ########## | not read    | none           | none

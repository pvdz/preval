# Preval test case

# try_catch_finally2_1.md

> Ref tracking > Done > Try-catch-finally > Try catch finally2 1
>
> Just repro a regression

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a);
} catch (e) {
  if ($1) {
    a = 2;
  }
}
$(a);
`````


## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
try /*7*/ {
  $(a___11__);
} catch (e___13__) /*14*/ {
  if ($1) {
    /*17*/ a___21__ = 2;
  } /*22*/ else {
  }
}
$(a___26__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 11,26       | none           | 21
  - r @11      | 4
  - w @21      | ########## | 26          | 4              | none
  - r @26      | 4,21

e:
  - w @13      | ########## | not read    | none           | none

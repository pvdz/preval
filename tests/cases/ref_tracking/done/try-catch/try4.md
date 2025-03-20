# Preval test case

# try4.md

> Ref tracking > Done > Try-catch > Try4
>
> Simple cases

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  x = 2;
} catch {
}
$(x); // 1 or 2 ("the assignment _could_ fail")
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  x___11__ = 2;
} catch (e___13__) /*14*/ {}
$(x___18__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18          | none           | 11
  - w @11      | ########## | 18          | 4              | none
  - r @18      | 4,11

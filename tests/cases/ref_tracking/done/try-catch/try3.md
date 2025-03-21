# Preval test case

# try3.md

> Ref tracking > Done > Try-catch > Try3
>
> Simple cases

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);
} catch {
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
} catch (e___13__) /*14*/ {}
$(x___18__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,18       | none           | none
  - r @11      | 4
  - r @18      | 4

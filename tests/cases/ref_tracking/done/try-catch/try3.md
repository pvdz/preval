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
let /*___4__*/ x = 1;
try /*7~11*/ {
  $(/*___11__*/ x);
} catch (/*___13__*/ e) /*14~14*/ {}
$(/*___18__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,18       | none           | none
  - r @11      | 4
  - r @18      | 4

e:
  - w @13      | ########## | not read    | none           | none

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
let /*___4__*/ x = 1;
try /*7~11*/ {
  /*___11__*/ x = 2;
} catch (/*___13__*/ e) /*14~14*/ {}
$(/*___18__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18          | none           | 11
  - w @11      | ########## | 18          | 4              | none
  - r @18      | 4,11

e:
  - w @13      | ########## | not read    | none           | none

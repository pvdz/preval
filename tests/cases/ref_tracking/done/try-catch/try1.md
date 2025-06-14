# Preval test case

# try1.md

> Ref tracking > Done > Try-catch > Try1
>
> Simplest case? This gets normalized away though.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
} catch {
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
$(/*___9__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | none
  - r @9       | 4

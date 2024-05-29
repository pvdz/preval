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
let x___4__ = 1;
$(x___9__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | none
  - r @9       | 4

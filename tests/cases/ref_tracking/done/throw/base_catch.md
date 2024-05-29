# Preval test case

# base_catch.md

> Ref tracking > Done > Throw > Base catch
>
> Base case

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  x = 2;
  throw 'abc';
} finally {
  x = 3;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  x___11__ = 2;
  throw `abc`;
} finally /*15*/ {
  x___19__ = 3;
}
$(x___23__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 23          | none           | 11,19
  - w @11      | ########## | not read    | 4              | 19
  - w @19      | ########## | not read    | 4,11           | none
  - r @23      | 4

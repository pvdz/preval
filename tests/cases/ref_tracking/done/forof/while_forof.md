# Preval test case

# while_forof.md

> Ref tracking > Done > Forof > While forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Options

- refTest

## Input

`````js filename=intro
const arr = [1, 2];
for (let x of arr) {
  $(x);
  continue;
}
$();
`````

## Output

(Annotated with pids)

`````filename=intro
const arr___4__ = [1, 2];
const tmpForOfDeclRhs___10__ = arr___11__;
let x___14__ = undefined___15__;
for (x___17__ of tmpForOfDeclRhs___18__) /*19*/ {
  $(x___23__);
}
$();
`````

Ref tracking result:

                    | reads      | read by     | overWrites     | overwritten by
arr:
  - w @4       | ########## | 11          | none           | none
  - r @11      | 4

tmpForOfDeclRhs:
  - w @10           | ########## | 18          | none           | none
  - r @18           | 10

x:
  - w @14           | ########## | not read    | none           | 17
  - w @17           | ########## | 23          | 14             | none
  - r @23           | 17

# Preval test case

# forof_break.md

> Ref tracking > Done > Forof > Forof break
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
const arr = [ 10, 20 ];
for (const x of arr) {
  $(x);
  break;
}
$('after');
`````

## Output

(Annotated with pids)

`````filename=intro
const arr___4__ = [10, 20];
const tmpForOfDeclRhs___10__ = arr___11__;
let x___14__ = undefined___15__;
for (x___17__ of tmpForOfDeclRhs___18__) /*19*/ {
  $(x___23__);
  break;
}
$(`after`);
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

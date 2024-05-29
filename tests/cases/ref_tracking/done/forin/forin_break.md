# Preval test case

# forin_break.md

> Ref tracking > Done > Forin > Forin break
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
const obj = {a:10, b:20};
for (const x in obj) {
  $(x);
  break;
}
$('after');
`````

## Output

(Annotated with pids)

`````filename=intro
const obj___4__ = { a___7__: 10, b___10__: 20 };
const tmpForInDeclRhs___14__ = obj___15__;
let x___18__ = undefined___19__;
for (x___21__ in tmpForInDeclRhs___22__) /*23*/ {
  $(x___27__);
  break;
}
$(`after`);
`````

Ref tracking result:

                    | reads      | read by     | overWrites     | overwritten by
obj:
  - w @4       | ########## | 15          | none           | none
  - r @15      | 4

tmpForInDeclRhs:
  - w @14           | ########## | 22          | none           | none
  - r @22           | 14

x:
  - w @18           | ########## | not read    | none           | 21
  - w @21           | ########## | 27          | 18             | none
  - r @27           | 21

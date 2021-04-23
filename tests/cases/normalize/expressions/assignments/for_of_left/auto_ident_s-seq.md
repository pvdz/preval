# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > For of left > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for ((a = ($(1), $(2), x)).x of $({ x: 1 }));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for ((a = ($(1), $(2), x)).x of $({ x: 1 }));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  $(1);
  $(2);
  a = x;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  $(1);
  $(2);
  a = 1;
  (1).x = tmpForOfLhsNode;
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > For of left > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((0 || 2).x of $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((0 || 2).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  let tmpAssignMemLhsObj = 0;
  if (tmpAssignMemLhsObj) {
  } else {
    tmpAssignMemLhsObj = 2;
  }
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  let tmpAssignMemLhsObj = 0;
  if (tmpAssignMemLhsObj) {
  } else {
    tmpAssignMemLhsObj = 2;
  }
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
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

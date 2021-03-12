# Preval test case

# auto_prop_complex_complex.md

> Normalize > Expressions > Assignments > For of left > Auto prop complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
$(a).b = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
$(a).b = $(2);
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
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
const tmpAssignMemLhsObj$1 = $(a);
const tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$2.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  const tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
const tmpAssignMemLhsObj$1 = $(a);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
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

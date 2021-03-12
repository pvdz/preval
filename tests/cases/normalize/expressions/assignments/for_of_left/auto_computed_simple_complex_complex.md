# Preval test case

# auto_computed_simple_complex_complex.md

> Normalize > Expressions > Assignments > For of left > Auto computed simple complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
a[$("b")] = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
a[$('b')] = $(2);
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
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
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

# Preval test case

# auto_seq_simple_computed_simple.md

> Normalize > Expressions > Assignments > For of left > Auto seq simple computed simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
($(1), a)["b"] = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
($(1), a)[`b`] = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(1);
const tmpAssignMemLhsObj$1 = a;
const tmpAssignMemLhsObj$3 = tmpAssignMemLhsObj$1;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$3.b = tmpAssignMemRhs;
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  a.x = tmpForOfLhsNode;
}
$(1);
const tmpAssignMemLhsObj$1 = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d of c) {
  const e = $( 1 );
  a = { b: e };
  a.x = d;
}
$( 1 );
const f = a;
const g = $( 2 );
f.b = g;
$( a );
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

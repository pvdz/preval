# Preval test case

# auto_prop_complex_simple.md

> Normalize > Expressions > Assignments > For in left > Auto prop complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x in $({ x: 1 }));
$(a).b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x in $({ x: 1 }));
$(a).b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
const tmpAssignMemLhsObj$1 = $(a);
tmpAssignMemLhsObj$1.b = 2;
$(a);
`````

## Output


`````js filename=intro
let a = 1;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  a.x = tmpForInLhsNode;
}
const tmpAssignMemLhsObj$1 = $(a);
tmpAssignMemLhsObj$1.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d in c) {
  const e = $( 1 );
  a = { b: e };
  a.x = d;
}
const f = $( a );
f.b = 2;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: { b: '1', x: '"x"' }
 - 4: { b: '2', x: '"x"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

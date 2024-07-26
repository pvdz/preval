# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > For in left > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (({ b } = $({ b: $(2) })).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
for (({ b: b } = $({ b: $(2) })).x in $({ x: 1 }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj = undefined;
  const tmpCallCallee$1 = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  tmpAssignMemLhsObj = tmpNestedAssignObjPatternRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b);
`````

## Output


`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  tmpNestedAssignObjPatternRhs.x = tmpForInLhsNode;
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e in d) {
  const f = $( 2 );
  const g = { b: f };
  const h = $( g );
  a = h.b;
  h.x = e;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

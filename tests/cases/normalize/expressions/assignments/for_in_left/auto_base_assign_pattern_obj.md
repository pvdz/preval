# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > For in left > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for ((a = { b } = $({ b: $(2) })).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
for ((a = { b: b } = $({ b: $(2) })).x in $({ x: 1 }));
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
  const tmpCallCallee$1 = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b);
`````

## Output


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  tmpNestedAssignObjPatternRhs.x = tmpForInLhsNode;
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
let b = {
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
  b = h;
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
 - 4: { b: '2', x: '"x"' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

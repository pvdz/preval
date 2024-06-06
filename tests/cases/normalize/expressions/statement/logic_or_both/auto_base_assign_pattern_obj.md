# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Logic or both > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
({ b } = $({ b: $(2) })) || ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
({ b: b } = $({ b: $(2) })) || ({ b: b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
  const tmpAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  b = tmpAssignObjPatternRhs.b;
}
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  $(a, tmpClusterSSA_b);
} else {
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam$1);
  const tmpClusterSSA_b$1 = tmpAssignObjPatternRhs.b;
  $(a, tmpClusterSSA_b$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 2 );
const c = { b: b };
const d = $( c );
const e = d.b;
if (d) {
  $( a, e );
}
else {
  const f = $( 2 );
  const g = { b: f };
  const h = $( g );
  const i = h.b;
  $( a, i );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Logic and both > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) && (a = { b } = $({ b: $(2) })));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$((a = { b: b } = $({ b: $(2) })) && (a = { b: b } = $({ b: $(2) })));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpCallCallee$3 = $;
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$3 = { b: tmpObjLitVal$1 };
  const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
  b = tmpNestedAssignObjPatternRhs$1.b;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
let tmpSSA_b = tmpNestedAssignObjPatternRhs.b;
let tmpSSA_a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = tmpNestedAssignObjPatternRhs;
if (tmpNestedAssignObjPatternRhs) {
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$3 = { b: tmpObjLitVal$1 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$3);
  tmpSSA_b = tmpNestedAssignObjPatternRhs$1.b;
  tmpSSA_a = tmpNestedAssignObjPatternRhs$1;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
  $(tmpNestedAssignObjPatternRhs$1);
} else {
  $(tmpCalleeParam);
}
$(tmpSSA_a, tmpSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
let d = c.b;
let e = c;
let f = c;
if (c) {
  const g = $( 2 );
  const h = { b: g };
  const i = $( h );
  d = i.b;
  e = i;
  f = i;
  $( i );
}
else {
  $( f );
}
$( e, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 2
 - 4: { b: '2' }
 - 5: { b: '2' }
 - 6: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Logic and both > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) && (a = [b] = $([$(2)])));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) && (a = [b] = $([$(2)])));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$3 = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  b = arrPatternSplat$1[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignArrPatternRhs;
if (tmpNestedAssignArrPatternRhs) {
  const tmpArrElement$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$3 /*:array*/ = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
  tmpClusterSSA_b = arrPatternSplat$1[0];
  tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
  $(tmpNestedAssignArrPatternRhs$1);
} else {
  $(tmpNestedAssignArrPatternRhs);
}
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
let e = d[ 0 ];
let f = c;
if (c) {
  const g = $( 2 );
  const h = [ g ];
  const i = $( h );
  const j = [ ...i ];
  e = j[ 0 ];
  f = i;
  $( i );
}
else {
  $( c );
}
$( f, e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: [2]
 - 6: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

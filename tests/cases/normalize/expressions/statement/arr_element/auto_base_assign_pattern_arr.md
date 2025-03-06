# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Arr element > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
([b] = $([$(2)])) + ([b] = $([$(2)]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
([b] = $([$(2)])) + ([b] = $([$(2)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = undefined;
const tmpArrElement$1 = $(2);
const tmpCalleeParam$1 = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
b = arrPatternSplat$1[0];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
const tmpArrElement$1 /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat$1[0];
tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
d[ 0 ];
const e = $( 2 );
const f = [ e ];
const g = $( f );
const h = [ ...g ];
const i = h[ 0 ];
c + g;
const j = {
  a: 999,
  b: 1000,
};
$( j, i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
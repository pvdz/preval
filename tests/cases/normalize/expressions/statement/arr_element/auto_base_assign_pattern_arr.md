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
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = undefined;
const tmpCallCallee$1 = $;
const tmpArrElement$1 = $(2);
const tmpCalleeParam$1 = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
b = arrPatternSplat$1[0];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
const tmpArrElement$1 = $(2);
const tmpCalleeParam$1 = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_b = arrPatternSplat$1[0];
tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = $( 2 );
const c = [ b ];
const d = $( c );
const e = [ ... d ];
e[ 0 ];
const f = $( 2 );
const g = [ f ];
const h = $( g );
const i = [ ... h ];
const j = i[ 0 ];
d + h;
$( a, j );
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

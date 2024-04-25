# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Arr element > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) + (a = [b] = $([$(2)])));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) + (a = [b] = $([$(2)])));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpBinBothLhs = a;
const tmpCallCallee$3 = $;
const tmpArrElement$1 = $(2);
const tmpCalleeParam$3 = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
b = arrPatternSplat$1[0];
a = tmpNestedAssignArrPatternRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
const tmpArrElement$1 = $(2);
const tmpCalleeParam$3 = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const tmpSSA_b$1 = arrPatternSplat$1[0];
const tmpCalleeParam = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs$1, tmpSSA_b$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ... c ];
d[ 0 ];
const e = $( 2 );
const f = [ e ];
const g = $( f );
const h = [ ... g ];
const i = h[ 0 ];
const j = c + g;
$( j );
$( g, i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: '22'
 - 6: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

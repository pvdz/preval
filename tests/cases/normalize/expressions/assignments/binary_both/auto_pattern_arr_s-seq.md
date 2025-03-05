# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), [1, 2])) + ([a] = ($(10), $(20), [1, 2])));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), [1, 2])) + ([a] = ($(10), $(20), [1, 2])));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpBinBothLhs = undefined;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = undefined;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs$1 = [1, 2];
const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
a = arrPatternSplat$3[0];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs /*:array*/ = [1, 2];
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat$1[0];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs$1 /*:array*/ = [1, 2];
const arrPatternSplat$3 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$3[0];
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
b[ 0 ];
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = [ ...c ];
d[ 0 ];
$( 10 );
$( 20 );
const e = [ 1, 2 ];
const f = [ ...e ];
const g = f[ 0 ];
const h = c + e;
$( h );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

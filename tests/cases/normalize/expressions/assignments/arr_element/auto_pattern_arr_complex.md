# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = $([1, 2])) + ([a] = $([1, 2])));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = $([1, 2])) + ([a] = $([1, 2])));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
let tmpBinBothLhs = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = undefined;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
a = arrPatternSplat$3[0];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat$1[0];
const tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
const tmpSSA_a$1 = arrPatternSplat$3[0];
const tmpCalleeParam = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpSSA_a$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a,, ];
b[ 0 ];
const c = [ 1, 2,, ];
const d = $( c );
const e = [ ... d,, ];
e[ 0 ];
const f = [ 1, 2,, ];
const g = $( f );
const h = [ ... g,, ];
const i = h[ 0 ];
const j = d + g;
$( j );
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

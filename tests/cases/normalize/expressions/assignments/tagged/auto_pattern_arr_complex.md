# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$`before ${([a] = $([1, 2]))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$([`before `, ` after`], ([a] = $([1, 2])));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$3);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_a = arrPatternSplat$1[0];
$(tmpCalleeParam, tmpNestedAssignArrPatternRhs);
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a ];
b[ 0 ];
const c = [ "before ", " after" ];
const d = [ 1, 2 ];
const e = $( d );
const f = [ ... e ];
const g = f[ 0 ];
$( c, e );
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

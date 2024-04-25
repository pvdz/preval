# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = $([1, 2])) ? $(100) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = $([1, 2])) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpIfTest = tmpNestedAssignArrPatternRhs;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
let tmpCalleeParam = undefined;
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_a = arrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
}
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
let c = undefined;
const d = [ 1, 2 ];
const e = $( d );
const f = [ ... e ];
const g = f[ 0 ];
if (e) {
  c = $( 100 );
  $( c );
}
else {
  c = $( 200 );
  $( c );
}
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

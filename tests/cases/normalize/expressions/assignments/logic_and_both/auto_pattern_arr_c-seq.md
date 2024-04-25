# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), $([1, 2]))) && ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), $([1, 2]))) && ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
$(10);
$(20);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (tmpCalleeParam) {
  $(10);
  $(20);
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
  const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
  a = arrPatternSplat$3[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
let tmpSSA_a = arrPatternSplat$1[0];
let tmpSSA_tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (tmpNestedAssignArrPatternRhs) {
  $(10);
  $(20);
  const tmpCalleeParam$3 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
  const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
  tmpSSA_a = arrPatternSplat$3[0];
  tmpSSA_tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
  $(tmpNestedAssignArrPatternRhs$1);
} else {
  $(tmpSSA_tmpCalleeParam);
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
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = $( c );
const e = [ ... d ];
let f = e[ 0 ];
let g = d;
if (d) {
  $( 10 );
  $( 20 );
  const h = [ 1, 2 ];
  const i = $( h );
  const j = [ ... i ];
  f = j[ 0 ];
  g = i;
  $( i );
}
else {
  $( g );
}
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > For let > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (let xyz = ([a] = $([1, 2])); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  let xyz = ([a] = $([1, 2]));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let xyz = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
xyz = tmpNestedAssignArrPatternRhs;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat$1[0];
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a ];
const c = b[ 0 ];
const d = [ 1, 2 ];
const e = $( d );
const f = [ ... e ];
f[ 0 ];
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( e );
  $( 1 );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

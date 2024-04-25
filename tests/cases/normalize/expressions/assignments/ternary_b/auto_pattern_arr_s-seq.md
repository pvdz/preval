# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Ternary b > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(1) ? ([a] = ($(10), $(20), [1, 2])) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(1) ? ([a] = ($(10), $(20), [1, 2])) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs;
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
let a = arrPatternSplat[0];
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs;
  $(tmpNestedAssignArrPatternRhs);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
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
let c = b[ 0 ];
let d = undefined;
const e = $( 1 );
if (e) {
  $( 10 );
  $( 20 );
  const f = [ 1, 2 ];
  const g = [ ... f ];
  c = g[ 0 ];
  d = f;
  $( f );
}
else {
  d = $( 200 );
  $( d );
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

# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Logic and right > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(100) && ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(100) && ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(10);
  $(20);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = [1, 2];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
let a /*:unknown*/ = arrPatternSplat[0];
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(10);
  $(20);
  const tmpCalleeParam$1 /*:array*/ = [1, 2];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  $(tmpNestedAssignArrPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
let c = b[ 0 ];
const d = $( 100 );
if (d) {
  $( 10 );
  $( 20 );
  const e = [ 1, 2 ];
  const f = $( e );
  const g = [ ...f ];
  c = g[ 0 ];
  $( f );
}
else {
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

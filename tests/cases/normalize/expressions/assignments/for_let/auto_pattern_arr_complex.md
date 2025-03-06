# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > For let > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

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
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
xyz = tmpNestedAssignArrPatternRhs;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat$1[0];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
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
const c = [ 1, 2 ];
const d = $( c );
const e = [ ...d ];
e[ 0 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( d );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
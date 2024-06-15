# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > While > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (([a] = $([1, 2]))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (([a] = $([1, 2]))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
while (true) {
  let tmpIfTest = undefined;
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_a = arrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  $(100);
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = [1, 2];
    const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
    const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
    tmpClusterSSA_a = arrPatternSplat$2[0];
    if (tmpNestedAssignArrPatternRhs$1) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ... a ];
b[ 0 ];
const c = [ 1, 2 ];
const d = $( c );
const e = [ ... d ];
let f = e[ 0 ];
if (d) {
  $( 100 );
  while ($LOOP_UNROLL_10) {
    const g = [ 1, 2 ];
    const h = $( g );
    const i = [ ... h ];
    f = i[ 0 ];
    if (h) {
      $( 100 );
    }
    else {
      break;
    }
  }
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

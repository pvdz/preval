# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Do while > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
do {
  $(100);
} while (([a] = $([1, 2])));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = [a] = $([1, 2]);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    tmpDoWhileFlag = tmpNestedAssignArrPatternRhs;
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
$(100);
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_a = arrPatternSplat$1[0];
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs;
let $tmpLoopUnrollCheck = true;
if (tmpNestedAssignArrPatternRhs) {
  $(100);
  const tmpCalleeParam$1 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
  tmpClusterSSA_a = arrPatternSplat$2[0];
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = [1, 2];
      const tmpNestedAssignArrPatternRhs$2 = $(tmpCalleeParam$2);
      const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$2];
      tmpClusterSSA_a = arrPatternSplat$3[0];
      tmpClusterSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs$2;
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
b: 1000
;
const b = [ ... a,, ];
b[ 0 ];
$( 100 );
const c = [ 1, 2,, ];
const d = $( c );
const e = [ ... d,, ];
let f = e[ 0 ];
let g = d;
let h = true;
if (d) {
  $( 100 );
  const i = [ 1, 2,, ];
  const j = $( i );
  const k = [ ... j,, ];
  f = k[ 0 ];
  g = j;
}
else {
  h = false;
}
if (h) {
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const l = [ 1, 2,, ];
      const m = $( l );
      const n = [ ... m,, ];
      f = n[ 0 ];
      g = m;
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

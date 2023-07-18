# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Do while > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
do {
  $(100);
} while (([a] = ($(10), $(20), $([1, 2]))));
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
    tmpDoWhileFlag = [a] = ($(10), $(20), $([1, 2]));
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
    $(10);
    $(20);
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
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_a = arrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  $(100);
  $(10);
  $(20);
  const tmpCalleeParam$1 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
  tmpClusterSSA_a = arrPatternSplat$2[0];
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedAssignArrPatternRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      $(10);
      $(20);
      const tmpCalleeParam$2 = [1, 2];
      const tmpNestedAssignArrPatternRhs$2 = $(tmpCalleeParam$2);
      const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$2];
      tmpClusterSSA_a = arrPatternSplat$3[0];
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedAssignArrPatternRhs$2;
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
$( 10 );
$( 20 );
const c = [ 1, 2,, ];
const d = $( c );
const e = [ ... d,, ];
let f = e[ 0 ];
if (d) {
  $( 100 );
  $( 10 );
  $( 20 );
  const g = [ 1, 2,, ];
  const h = $( g );
  const i = [ ... h,, ];
  f = i[ 0 ];
  let j = h;
  while ($LOOP_UNROLL_9) {
    if (j) {
      $( 100 );
      $( 10 );
      $( 20 );
      const k = [ 1, 2,, ];
      const l = $( k );
      const m = [ ... l,, ];
      f = m[ 0 ];
      j = l;
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

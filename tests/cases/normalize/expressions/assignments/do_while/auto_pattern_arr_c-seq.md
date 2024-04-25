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
let tmpSSA_a = arrPatternSplat$1[0];
let tmpSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs;
if (tmpNestedAssignArrPatternRhs) {
  $(100);
  $(10);
  $(20);
  const tmpCalleeParam$1 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
  tmpSSA_a = arrPatternSplat$2[0];
  tmpSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      $(10);
      $(20);
      const tmpCalleeParam$2 = [1, 2];
      const tmpNestedAssignArrPatternRhs$2 = $(tmpCalleeParam$2);
      const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$2];
      tmpSSA_a = arrPatternSplat$3[0];
      tmpSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs$2;
    } else {
      break;
    }
  }
} else {
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
$( 100 );
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = $( c );
const e = [ ... d ];
let f = e[ 0 ];
let g = d;
if (d) {
  $( 100 );
  $( 10 );
  $( 20 );
  const h = [ 1, 2 ];
  const i = $( h );
  const j = [ ... i ];
  f = j[ 0 ];
  g = i;
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      $( 10 );
      $( 20 );
      const k = [ 1, 2 ];
      const l = $( k );
      const m = [ ... l ];
      f = m[ 0 ];
      g = l;
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

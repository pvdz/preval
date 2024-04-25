# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > While > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (([a] = ($(10), $(20), $([1, 2])))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (([a] = ($(10), $(20), $([1, 2])))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
while (true) {
  let tmpIfTest = undefined;
  $(10);
  $(20);
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
let $tmpLoopUnrollCheck = true;
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
let tmpSSA_a = arrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(10);
    $(20);
    const tmpCalleeParam$1 = [1, 2];
    const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
    const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
    tmpSSA_a = arrPatternSplat$2[0];
    if (tmpNestedAssignArrPatternRhs$1) {
      $(100);
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
let c = true;
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
const f = [ ... e ];
let g = f[ 0 ];
if (e) {
  $( 100 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 10 );
    $( 20 );
    const h = [ 1, 2 ];
    const i = $( h );
    const j = [ ... i ];
    g = j[ 0 ];
    if (i) {
      $( 100 );
    }
    else {
      break;
    }
  }
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

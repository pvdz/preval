# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Do while > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = [b] = $([$(2)])));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = [b] = $([$(2)]);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    let tmpNestedComplexRhs = undefined;
    const tmpCallCallee = $;
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
$(100);
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
let tmpSSA_b = arrPatternSplat[0];
let tmpSSA_a = tmpNestedAssignArrPatternRhs;
let tmpSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs;
if (tmpNestedAssignArrPatternRhs) {
  $(100);
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$1 = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  tmpSSA_b = arrPatternSplat$1[0];
  tmpSSA_a = tmpNestedAssignArrPatternRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpArrElement$2 = $(2);
      const tmpCalleeParam$2 = [tmpArrElement$2];
      const tmpNestedAssignArrPatternRhs$2 = $(tmpCalleeParam$2);
      const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$2];
      tmpSSA_b = arrPatternSplat$2[0];
      tmpSSA_a = tmpNestedAssignArrPatternRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedAssignArrPatternRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, tmpSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ... c ];
let e = d[ 0 ];
let f = c;
let g = c;
if (c) {
  $( 100 );
  const h = $( 2 );
  const i = [ h ];
  const j = $( i );
  const k = [ ... j ];
  e = k[ 0 ];
  f = j;
  g = j;
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const l = $( 2 );
      const m = [ l ];
      const n = $( m );
      const o = [ ... n ];
      e = o[ 0 ];
      f = n;
      g = n;
    }
    else {
      break;
    }
  }
}
$( f, e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: 100
 - 5: 2
 - 6: [2]
 - 7: 100
 - 8: 2
 - 9: [2]
 - 10: 100
 - 11: 2
 - 12: [2]
 - 13: 100
 - 14: 2
 - 15: [2]
 - 16: 100
 - 17: 2
 - 18: [2]
 - 19: 100
 - 20: 2
 - 21: [2]
 - 22: 100
 - 23: 2
 - 24: [2]
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

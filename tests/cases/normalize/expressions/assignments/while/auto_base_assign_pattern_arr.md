# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > While > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
while ((a = [b] = $([$(2)]))) $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while ((a = [b] = $([$(2)]))) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_b = arrPatternSplat[0];
let tmpClusterSSA_a = tmpNestedAssignArrPatternRhs;
if (tmpNestedAssignArrPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpArrElement$1 = $(2);
    const tmpCalleeParam$1 = [tmpArrElement$1];
    const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
    tmpClusterSSA_b = arrPatternSplat$1[0];
    tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    if (tmpNestedAssignArrPatternRhs$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ... c ];
let e = d[ 0 ];
let f = c;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( 2 );
    const h = [ g ];
    const i = $( h );
    const j = [ ... i ];
    e = j[ 0 ];
    f = i;
    if (i) {

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
 - 1: 2
 - 2: [2]
 - 3: 100
 - 4: 2
 - 5: [2]
 - 6: 100
 - 7: 2
 - 8: [2]
 - 9: 100
 - 10: 2
 - 11: [2]
 - 12: 100
 - 13: 2
 - 14: [2]
 - 15: 100
 - 16: 2
 - 17: [2]
 - 18: 100
 - 19: 2
 - 20: [2]
 - 21: 100
 - 22: 2
 - 23: [2]
 - 24: 100
 - 25: 2
 - 26: [2]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

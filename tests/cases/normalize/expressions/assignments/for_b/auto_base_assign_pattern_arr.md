# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > For b > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (; (a = [b] = $([$(2)])); $(1));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  while ((a = [b] = $([$(2)]))) {
    $(1);
  }
}
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
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_b = arrPatternSplat[0];
let tmpClusterSSA_a = tmpNestedAssignArrPatternRhs;
if (tmpNestedAssignArrPatternRhs) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpArrElement$1 = $(2);
    const tmpCalleeParam$1 = [tmpArrElement$1];
    const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
    tmpClusterSSA_b = arrPatternSplat$1[0];
    tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
    if (tmpNestedAssignArrPatternRhs$1) {
      $(1);
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
let a = true;
const b = $( 2 );
const c = [ b ];
const d = $( c );
const e = [ ... d ];
let f = e[ 0 ];
let g = d;
if (d) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const h = $( 2 );
    const i = [ h ];
    const j = $( i );
    const k = [ ... j ];
    f = k[ 0 ];
    g = j;
    if (j) {
      $( 1 );
    }
    else {
      break;
    }
  }
}
$( g, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 1
 - 4: 2
 - 5: [2]
 - 6: 1
 - 7: 2
 - 8: [2]
 - 9: 1
 - 10: 2
 - 11: [2]
 - 12: 1
 - 13: 2
 - 14: [2]
 - 15: 1
 - 16: 2
 - 17: [2]
 - 18: 1
 - 19: 2
 - 20: [2]
 - 21: 1
 - 22: 2
 - 23: [2]
 - 24: 1
 - 25: 2
 - 26: [2]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Do while > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (([b] = $([$(2)])));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (([b] = $([$(2)]))) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_b = arrPatternSplat[0];
if (tmpNestedAssignArrPatternRhs) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpArrElement$1 = $(2);
    const tmpCalleeParam$1 = [tmpArrElement$1];
    const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
    tmpClusterSSA_b = arrPatternSplat$1[0];
    if (tmpNestedAssignArrPatternRhs$1) {
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = $( 2 );
const c = [ b ];
const d = $( c );
const e = [ ... d ];
let f = e[ 0 ];
if (d) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( 2 );
    const h = [ g ];
    const i = $( h );
    const j = [ ... i ];
    f = j[ 0 ];
    if (i) {

    }
    else {
      break;
    }
  }
}
const k = {
  a: 999,
  b: 1000,
};
$( k, f );
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

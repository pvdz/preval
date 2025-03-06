# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > For c > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (; $(1); a = [b] = $([$(2)]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = [b] = $([$(2)]);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let b /*:unknown*/ = [];
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpArrElement$1 /*:unknown*/ = $(2);
      const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
      const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
      b = arrPatternSplat$1[0];
      a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = [];
let b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  const d = $( 2 );
  const e = [ d ];
  const f = $( e );
  const g = [ ...f ];
  a = g[ 0 ];
  b = f;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      const i = $( 2 );
      const j = [ i ];
      const k = $( j );
      const l = [ ...k ];
      a = l[ 0 ];
      b = k;
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: 1
 - 5: 2
 - 6: [2]
 - 7: 1
 - 8: 2
 - 9: [2]
 - 10: 1
 - 11: 2
 - 12: [2]
 - 13: 1
 - 14: 2
 - 15: [2]
 - 16: 1
 - 17: 2
 - 18: [2]
 - 19: 1
 - 20: 2
 - 21: [2]
 - 22: 1
 - 23: 2
 - 24: [2]
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- objects in isFree check
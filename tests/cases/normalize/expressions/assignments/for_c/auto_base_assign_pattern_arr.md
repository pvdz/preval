# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > For c > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

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
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpArrElement$1 = $(2);
      const tmpCalleeParam$1 = [tmpArrElement$1];
      const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
      const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
      b = arrPatternSplat$1[0];
      a = tmpNestedAssignArrPatternRhs$1;
      tmpIfTest = $(1);
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
b: 1000
;
let c = $( 1 );
if (c) {
  const d = $( 2 );
  const e = [ d,, ];
  const f = $( e );
  const g = [ ... f,, ];
  a = g[ 0 ];
  b = f;
  c = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (c) {
      const h = $( 2 );
      const i = [ h,, ];
      const j = $( i );
      const k = [ ... j,, ];
      a = k[ 0 ];
      b = j;
      c = $( 1 );
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

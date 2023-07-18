# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > For c > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = [x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = [x, y] = [$(3), $(4)];
  }
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a = tmpNestedAssignArrPatternRhs;
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpArrElement$2 = $(3);
      const tmpArrElement$4 = $(4);
      const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$4];
      const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
      x = arrPatternSplat$1[0];
      y = arrPatternSplat$1[1];
      a = tmpNestedAssignArrPatternRhs$1;
      tmpClusterSSA_tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
let c = {
a: 999,
b: 1000
;
const d = $( 1 );
if (d) {
  const e = $( 3 );
  const f = $( 4 );
  const g = [ e, f,, ];
  const h = [ ... g,, ];
  a = h[ 0 ];
  b = h[ 1 ];
  c = g;
  let i = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (i) {
      const j = $( 3 );
      const k = $( 4 );
      const l = [ j, k,, ];
      const m = [ ... l,, ];
      a = m[ 0 ];
      b = m[ 1 ];
      c = l;
      i = $( 1 );
    }
    else {
      break;
    }
  }
}
$( c, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: 1
 - 5: 3
 - 6: 4
 - 7: 1
 - 8: 3
 - 9: 4
 - 10: 1
 - 11: 3
 - 12: 4
 - 13: 1
 - 14: 3
 - 15: 4
 - 16: 1
 - 17: 3
 - 18: 4
 - 19: 1
 - 20: 3
 - 21: 4
 - 22: 1
 - 23: 3
 - 24: 4
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

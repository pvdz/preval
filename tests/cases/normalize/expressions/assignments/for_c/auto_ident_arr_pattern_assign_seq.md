# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For c > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = [x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = [x, y] = ($(x), $(y), [$(3), $(4)]);
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
    $(x);
    $(y);
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(x);
      $(y);
      const tmpArrElement$2 = $(3);
      const tmpArrElement$4 = $(4);
      x = tmpArrElement$2;
      y = tmpArrElement$4;
      tmpClusterSSA_tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = $( 1 );
if (c) {
  $( 1 );
  $( 2 );
  const d = $( 3 );
  const e = $( 4 );
  a = d;
  b = e;
  let f = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (f) {
      $( a );
      $( b );
      const g = $( 3 );
      const h = $( 4 );
      a = g;
      b = h;
      f = $( 1 );
    }
    else {
      break;
    }
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 1
 - 7: 3
 - 8: 4
 - 9: 3
 - 10: 4
 - 11: 1
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 1
 - 17: 3
 - 18: 4
 - 19: 3
 - 20: 4
 - 21: 1
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

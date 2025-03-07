# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For c > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = [x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(x);
      $(y);
      const tmpArrElement$2 /*:unknown*/ = $(3);
      const tmpArrElement$4 /*:unknown*/ = $(4);
      const tmpNestedAssignArrPatternRhs$1 /*:array*/ = [tmpArrElement$2, tmpArrElement$4];
      const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
      x = arrPatternSplat$1[0];
      y = arrPatternSplat$1[1];
      a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
} else {
}
$(a, x, y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
if ($(1)) {
  $(1);
  $(2);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  while (true) {
    if ($(1)) {
      $(x);
      $(y);
      const tmpArrElement$2 = $(3);
      const tmpArrElement$4 = $(4);
      const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$4];
      const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
      x = arrPatternSplat$1[0];
      y = arrPatternSplat$1[1];
      a = tmpNestedAssignArrPatternRhs$1;
    } else {
      break;
    }
  }
}
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
while (true) {
  const tmpIfTest = $(1);
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
  } else {
    break;
  }
}
$(a, x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
let c = {
  a: 999,
  b: 1000,
};
const d = $( 1 );
if (d) {
  $( 1 );
  $( 2 );
  const e = $( 3 );
  const f = $( 4 );
  const g = [ e, f ];
  const h = [ ...g ];
  a = h[ 0 ];
  b = h[ 1 ];
  c = g;
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      $( a );
      $( b );
      const j = $( 3 );
      const k = $( 4 );
      const l = [ j, k ];
      const m = [ ...l ];
      a = m[ 0 ];
      b = m[ 1 ];
      c = l;
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

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- objects in isFree check
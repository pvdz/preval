# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For c > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = { x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) });
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
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpNestedAssignObjPatternRhs.x;
    y = tmpNestedAssignObjPatternRhs.y;
    a = tmpNestedAssignObjPatternRhs;
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
  const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  a = tmpNestedAssignObjPatternRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(x);
      $(y);
      const tmpObjLitVal$2 /*:unknown*/ = $(3);
      const tmpObjLitVal$4 /*:unknown*/ = $(4);
      x = tmpObjLitVal$2;
      y = tmpObjLitVal$4;
      const tmpNestedAssignObjPatternRhs$1 /*:object*/ = { x: tmpObjLitVal$2, y: tmpObjLitVal$4 };
      a = tmpNestedAssignObjPatternRhs$1;
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
  b: 1000,
};
const d = $( 1 );
if (d) {
  $( 1 );
  $( 2 );
  const e = $( 3 );
  const f = $( 4 );
  a = e;
  b = f;
  const g = {
    x: e,
    y: f,
  };
  c = g;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      $( a );
      $( b );
      const i = $( 3 );
      const j = $( 4 );
      a = i;
      b = j;
      const k = {
        x: i,
        y: j,
      };
      c = k;
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

Todos triggered:
- objects in isFree check
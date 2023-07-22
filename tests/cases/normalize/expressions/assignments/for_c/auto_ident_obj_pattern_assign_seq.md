# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For c > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

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
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    $(x);
    $(y);
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpNestedAssignObjPatternRhs.x;
    y = tmpNestedAssignObjPatternRhs.y;
    a = tmpNestedAssignObjPatternRhs;
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
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  a = tmpNestedAssignObjPatternRhs;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(x);
      $(y);
      const tmpObjLitVal$2 = $(3);
      const tmpObjLitVal$4 = $(4);
      x = tmpObjLitVal$2;
      y = tmpObjLitVal$4;
      const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$4 };
      a = tmpNestedAssignObjPatternRhs$1;
      tmpIfTest = $(1);
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
let d = $( 1 );
let e = true;
if (d) {
  $( 1 );
  $( 2 );
  const f = $( 3 );
  const g = $( 4 );
  a = f;
  b = g;
  const h = {
x: f,
y: g
  ;
  c = h;
  d = $( 1 );
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_10) {
    if (d) {
      $( a );
      $( b );
      const i = $( 3 );
      const j = $( 4 );
      a = i;
      b = j;
      const k = {
x: i,
y: j
      ;
      c = k;
      d = $( 1 );
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

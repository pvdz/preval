# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Do while > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (({ x, y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (({ x: x, y: y } = { x: $(3), y: $(4) })) {
  } else {
    break;
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
  $(100);
  let tmpIfTest = undefined;
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$4 = $(4);
let x = tmpObjLitVal$2;
let y = tmpObjLitVal$4;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpObjLitVal$3 = $(3);
  const tmpObjLitVal$5 = $(4);
  x = tmpObjLitVal$3;
  y = tmpObjLitVal$5;
}
const a = { a: 999, b: 1000 };
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
const a = $( 3 );
const b = $( 4 );
let c = a;
let d = b;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const e = $( 3 );
  const f = $( 4 );
  c = e;
  d = f;
}
const g = {
a: 999,
b: 1000
;
$( g, c, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: 100
 - 5: 3
 - 6: 4
 - 7: 100
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 100
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 100
 - 20: 3
 - 21: 4
 - 22: 100
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

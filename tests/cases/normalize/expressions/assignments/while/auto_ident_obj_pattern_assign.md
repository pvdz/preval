# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > While > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
while ((a = { x, y } = { x: $(3), y: $(4) })) $(100);
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
while ((a = { x: x, y: y } = { x: $(3), y: $(4) })) $(100);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  a = tmpNestedAssignObjPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
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
let tmpSSA_x$1 = tmpObjLitVal$2;
let tmpSSA_y$1 = tmpObjLitVal$4;
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$4 };
let tmpSSA_a$2 = tmpNestedAssignObjPatternRhs$1;
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpObjLitVal$3 = $(3);
  const tmpObjLitVal$5 = $(4);
  tmpSSA_x$1 = tmpObjLitVal$3;
  tmpSSA_y$1 = tmpObjLitVal$5;
  const tmpNestedAssignObjPatternRhs$2 = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
  tmpSSA_a$2 = tmpNestedAssignObjPatternRhs$2;
  $(100);
}
$(tmpSSA_a$2, tmpSSA_x$1, tmpSSA_y$1);
`````

## PST Output

With rename=true

`````js filename=intro
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
const e = {
x: a,
y: b
;
let f = e;
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = $( 3 );
  const h = $( 4 );
  c = g;
  d = h;
  const i = {
x: g,
y: h
  ;
  f = i;
  $( 100 );
}
$( f, c, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 100
 - 4: 3
 - 5: 4
 - 6: 100
 - 7: 3
 - 8: 4
 - 9: 100
 - 10: 3
 - 11: 4
 - 12: 100
 - 13: 3
 - 14: 4
 - 15: 100
 - 16: 3
 - 17: 4
 - 18: 100
 - 19: 3
 - 20: 4
 - 21: 100
 - 22: 3
 - 23: 4
 - 24: 100
 - 25: 3
 - 26: 4
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

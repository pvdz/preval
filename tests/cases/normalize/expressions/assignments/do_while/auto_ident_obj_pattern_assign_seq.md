# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = { x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) });
  }
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    let tmpNestedComplexRhs = undefined;
    $(x);
    $(y);
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpNestedAssignObjPatternRhs.x;
    y = tmpNestedAssignObjPatternRhs.y;
    tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(100);
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$(100);
$(tmpObjLitVal);
$(tmpObjLitVal$1);
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$4 = $(4);
$(100);
$(tmpObjLitVal$2);
$(tmpObjLitVal$4);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(4);
$(100);
$(tmpObjLitVal$3);
$(tmpObjLitVal$5);
const tmpObjLitVal$6 = $(3);
const tmpObjLitVal$8 = $(4);
$(100);
$(tmpObjLitVal$6);
$(tmpObjLitVal$8);
const tmpObjLitVal$7 = $(3);
const tmpObjLitVal$9 = $(4);
$(100);
$(tmpObjLitVal$7);
$(tmpObjLitVal$9);
const tmpObjLitVal$10 = $(3);
const tmpObjLitVal$12 = $(4);
$(100);
$(tmpObjLitVal$10);
$(tmpObjLitVal$12);
const tmpObjLitVal$11 = $(3);
const tmpObjLitVal$13 = $(4);
$(100);
$(tmpObjLitVal$11);
$(tmpObjLitVal$13);
const tmpObjLitVal$14 = $(3);
const tmpObjLitVal$16 = $(4);
$(100);
$(tmpObjLitVal$14);
$(tmpObjLitVal$16);
const tmpObjLitVal$15 = $(3);
const tmpObjLitVal$17 = $(4);
$(100);
$(tmpObjLitVal$15);
$(tmpObjLitVal$17);
const tmpObjLitVal$18 = $(3);
const tmpObjLitVal$20 = $(4);
$(100);
$(tmpObjLitVal$18);
$(tmpObjLitVal$20);
const tmpObjLitVal$19 = $(3);
const tmpObjLitVal$21 = $(4);
let tmpSSA_x$1 = tmpObjLitVal$19;
let tmpSSA_y$1 = tmpObjLitVal$21;
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$19, y: tmpObjLitVal$21 };
let tmpSSA_a$2 = tmpNestedAssignObjPatternRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  $(tmpSSA_x$1);
  $(tmpSSA_y$1);
  const tmpObjLitVal$22 = $(3);
  const tmpObjLitVal$24 = $(4);
  tmpSSA_x$1 = tmpObjLitVal$22;
  tmpSSA_y$1 = tmpObjLitVal$24;
  const tmpNestedAssignObjPatternRhs$2 = { x: tmpObjLitVal$22, y: tmpObjLitVal$24 };
  tmpSSA_a$2 = tmpNestedAssignObjPatternRhs$2;
}
$(tmpSSA_a$2, tmpSSA_x$1, tmpSSA_y$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
$( 100 );
$( a );
$( b );
const c = $( 3 );
const d = $( 4 );
$( 100 );
$( c );
$( d );
const e = $( 3 );
const f = $( 4 );
$( 100 );
$( e );
$( f );
const g = $( 3 );
const h = $( 4 );
$( 100 );
$( g );
$( h );
const i = $( 3 );
const j = $( 4 );
$( 100 );
$( i );
$( j );
const k = $( 3 );
const l = $( 4 );
$( 100 );
$( k );
$( l );
const m = $( 3 );
const n = $( 4 );
$( 100 );
$( m );
$( n );
const o = $( 3 );
const p = $( 4 );
$( 100 );
$( o );
$( p );
const q = $( 3 );
const r = $( 4 );
$( 100 );
$( q );
$( r );
const s = $( 3 );
const t = $( 4 );
$( 100 );
$( s );
$( t );
const u = $( 3 );
const v = $( 4 );
let w = u;
let x = v;
const y = {
x: u,
y: v
;
let z = y;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  $( w );
  $( x );
  const 01 = $( 3 );
  const 11 = $( 4 );
  w = 01;
  x = 11;
  const 21 = {
x: 01,
y: 11
  ;
  z = 21;
}
$( z, w, x );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 100
 - 7: 3
 - 8: 4
 - 9: 3
 - 10: 4
 - 11: 100
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 3
 - 20: 4
 - 21: 100
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

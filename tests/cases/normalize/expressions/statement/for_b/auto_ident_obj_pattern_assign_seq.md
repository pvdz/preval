# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > For b > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })); $(1));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while (({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) }))) {
    $(1);
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
  let tmpIfTest = undefined;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$(1);
$(tmpObjLitVal);
$(tmpObjLitVal$1);
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$4 = $(4);
$(1);
$(tmpObjLitVal$2);
$(tmpObjLitVal$4);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(4);
$(1);
$(tmpObjLitVal$3);
$(tmpObjLitVal$5);
const tmpObjLitVal$6 = $(3);
const tmpObjLitVal$8 = $(4);
$(1);
$(tmpObjLitVal$6);
$(tmpObjLitVal$8);
const tmpObjLitVal$7 = $(3);
const tmpObjLitVal$9 = $(4);
$(1);
$(tmpObjLitVal$7);
$(tmpObjLitVal$9);
const tmpObjLitVal$10 = $(3);
const tmpObjLitVal$12 = $(4);
$(1);
$(tmpObjLitVal$10);
$(tmpObjLitVal$12);
const tmpObjLitVal$11 = $(3);
const tmpObjLitVal$13 = $(4);
$(1);
$(tmpObjLitVal$11);
$(tmpObjLitVal$13);
const tmpObjLitVal$14 = $(3);
const tmpObjLitVal$16 = $(4);
$(1);
$(tmpObjLitVal$14);
$(tmpObjLitVal$16);
const tmpObjLitVal$15 = $(3);
const tmpObjLitVal$17 = $(4);
$(1);
$(tmpObjLitVal$15);
$(tmpObjLitVal$17);
const tmpObjLitVal$18 = $(3);
const tmpObjLitVal$20 = $(4);
$(1);
$(tmpObjLitVal$18);
$(tmpObjLitVal$20);
const tmpObjLitVal$19 = $(3);
const tmpObjLitVal$21 = $(4);
let tmpClusterSSA_x$1 = tmpObjLitVal$19;
let tmpClusterSSA_y$1 = tmpObjLitVal$21;
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_x$1);
  $(tmpClusterSSA_y$1);
  const tmpObjLitVal$22 = $(3);
  const tmpObjLitVal$24 = $(4);
  tmpClusterSSA_x$1 = tmpObjLitVal$22;
  tmpClusterSSA_y$1 = tmpObjLitVal$24;
  $(1);
}
const a = { a: 999, b: 1000 };
$(a, tmpClusterSSA_x$1, tmpClusterSSA_y$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
$( 1 );
$( a );
$( b );
const c = $( 3 );
const d = $( 4 );
$( 1 );
$( c );
$( d );
const e = $( 3 );
const f = $( 4 );
$( 1 );
$( e );
$( f );
const g = $( 3 );
const h = $( 4 );
$( 1 );
$( g );
$( h );
const i = $( 3 );
const j = $( 4 );
$( 1 );
$( i );
$( j );
const k = $( 3 );
const l = $( 4 );
$( 1 );
$( k );
$( l );
const m = $( 3 );
const n = $( 4 );
$( 1 );
$( m );
$( n );
const o = $( 3 );
const p = $( 4 );
$( 1 );
$( o );
$( p );
const q = $( 3 );
const r = $( 4 );
$( 1 );
$( q );
$( r );
const s = $( 3 );
const t = $( 4 );
$( 1 );
$( s );
$( t );
const u = $( 3 );
const v = $( 4 );
let w = u;
let x = v;
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( w );
  $( x );
  const y = $( 3 );
  const z = $( 4 );
  w = y;
  x = z;
  $( 1 );
}
const 01 = {
a: 999,
b: 1000
;
$( 01, w, x );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 1
 - 6: 3
 - 7: 4
 - 8: 3
 - 9: 4
 - 10: 1
 - 11: 3
 - 12: 4
 - 13: 3
 - 14: 4
 - 15: 1
 - 16: 3
 - 17: 4
 - 18: 3
 - 19: 4
 - 20: 1
 - 21: 3
 - 22: 4
 - 23: 3
 - 24: 4
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

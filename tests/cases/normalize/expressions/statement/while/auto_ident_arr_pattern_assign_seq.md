# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > While > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
while (([x, y] = ($(x), $(y), [$(3), $(4)]))) $(100);
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
while (([x, y] = ($(x), $(y), [$(3), $(4)]))) $(100);
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
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
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
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$(100);
$(tmpArrElement);
$(tmpArrElement$1);
const tmpArrElement$2 = $(3);
const tmpArrElement$4 = $(4);
$(100);
$(tmpArrElement$2);
$(tmpArrElement$4);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
$(100);
$(tmpArrElement$3);
$(tmpArrElement$5);
const tmpArrElement$6 = $(3);
const tmpArrElement$8 = $(4);
$(100);
$(tmpArrElement$6);
$(tmpArrElement$8);
const tmpArrElement$7 = $(3);
const tmpArrElement$9 = $(4);
$(100);
$(tmpArrElement$7);
$(tmpArrElement$9);
const tmpArrElement$10 = $(3);
const tmpArrElement$12 = $(4);
$(100);
$(tmpArrElement$10);
$(tmpArrElement$12);
const tmpArrElement$11 = $(3);
const tmpArrElement$13 = $(4);
$(100);
$(tmpArrElement$11);
$(tmpArrElement$13);
const tmpArrElement$14 = $(3);
const tmpArrElement$16 = $(4);
$(100);
$(tmpArrElement$14);
$(tmpArrElement$16);
const tmpArrElement$15 = $(3);
const tmpArrElement$17 = $(4);
$(100);
$(tmpArrElement$15);
$(tmpArrElement$17);
const tmpArrElement$18 = $(3);
const tmpArrElement$20 = $(4);
$(100);
$(tmpArrElement$18);
$(tmpArrElement$20);
const tmpArrElement$19 = $(3);
const tmpArrElement$21 = $(4);
let tmpClusterSSA_x$1 = tmpArrElement$19;
let tmpClusterSSA_y$1 = tmpArrElement$21;
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_x$1);
  $(tmpClusterSSA_y$1);
  const tmpArrElement$22 = $(3);
  const tmpArrElement$24 = $(4);
  tmpClusterSSA_x$1 = tmpArrElement$22;
  tmpClusterSSA_y$1 = tmpArrElement$24;
  $(100);
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
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( w );
  $( x );
  const y = $( 3 );
  const z = $( 4 );
  w = y;
  x = z;
  $( 100 );
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
 - 5: 100
 - 6: 3
 - 7: 4
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 3
 - 14: 4
 - 15: 100
 - 16: 3
 - 17: 4
 - 18: 3
 - 19: 4
 - 20: 100
 - 21: 3
 - 22: 4
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For b > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; (a = [x, y] = ($(x), $(y), [$(3), $(4)])); $(1));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while ((a = [x, y] = ($(x), $(y), [$(3), $(4)]))) {
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
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  let tmpIfTest = a;
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
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$(1);
$(tmpArrElement);
$(tmpArrElement$1);
const tmpArrElement$2 = $(3);
const tmpArrElement$4 = $(4);
$(1);
$(tmpArrElement$2);
$(tmpArrElement$4);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
$(1);
$(tmpArrElement$3);
$(tmpArrElement$5);
const tmpArrElement$6 = $(3);
const tmpArrElement$8 = $(4);
$(1);
$(tmpArrElement$6);
$(tmpArrElement$8);
const tmpArrElement$7 = $(3);
const tmpArrElement$9 = $(4);
$(1);
$(tmpArrElement$7);
$(tmpArrElement$9);
const tmpArrElement$10 = $(3);
const tmpArrElement$12 = $(4);
$(1);
$(tmpArrElement$10);
$(tmpArrElement$12);
const tmpArrElement$11 = $(3);
const tmpArrElement$13 = $(4);
$(1);
$(tmpArrElement$11);
$(tmpArrElement$13);
const tmpArrElement$14 = $(3);
const tmpArrElement$16 = $(4);
$(1);
$(tmpArrElement$14);
$(tmpArrElement$16);
const tmpArrElement$15 = $(3);
const tmpArrElement$17 = $(4);
$(1);
$(tmpArrElement$15);
$(tmpArrElement$17);
const tmpArrElement$18 = $(3);
const tmpArrElement$20 = $(4);
$(1);
$(tmpArrElement$18);
$(tmpArrElement$20);
const tmpArrElement$19 = $(3);
const tmpArrElement$21 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$19, tmpArrElement$21];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
let tmpClusterSSA_x$2 = arrPatternSplat$1[0];
let tmpClusterSSA_y$2 = arrPatternSplat$1[1];
let tmpClusterSSA_a$2 = tmpNestedAssignArrPatternRhs$1;
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_x$2);
  $(tmpClusterSSA_y$2);
  const tmpArrElement$22 = $(3);
  const tmpArrElement$24 = $(4);
  const tmpNestedAssignArrPatternRhs$2 = [tmpArrElement$22, tmpArrElement$24];
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$2];
  tmpClusterSSA_x$2 = arrPatternSplat$2[0];
  tmpClusterSSA_y$2 = arrPatternSplat$2[1];
  tmpClusterSSA_a$2 = tmpNestedAssignArrPatternRhs$2;
  $(1);
}
$(tmpClusterSSA_a$2, tmpClusterSSA_x$2, tmpClusterSSA_y$2);
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
const w = [ u, v,, ];
const x = [ ... w,, ];
let y = x[ 0 ];
let z = x[ 1 ];
let 01 = w;
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( y );
  $( z );
  const 11 = $( 3 );
  const 21 = $( 4 );
  const 31 = [ 11, 21,, ];
  const 41 = [ ... 31,, ];
  y = 41[ 0 ];
  z = 41[ 1 ];
  01 = 31;
  $( 1 );
}
$( 01, y, z );
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

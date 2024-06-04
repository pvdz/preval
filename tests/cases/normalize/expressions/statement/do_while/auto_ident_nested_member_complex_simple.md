# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($(b)[$("x")] = $(c)[$("y")] = d));
$(a, b, c, d);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (($(b)[$(`x`)] = $(c)[$(`y`)] = d)) {
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = d;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpIfTest = varInitAssignLhsComputedRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
$(100);
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
$(100);
const varInitAssignLhsComputedObj$2 = $(b);
const varInitAssignLhsComputedProp$2 = $(`x`);
const varInitAssignLhsComputedObj$4 = $(c);
const varInitAssignLhsComputedProp$4 = $(`y`);
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
$(100);
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(c);
const varInitAssignLhsComputedProp$5 = $(`y`);
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
$(100);
const varInitAssignLhsComputedObj$6 = $(b);
const varInitAssignLhsComputedProp$6 = $(`x`);
const varInitAssignLhsComputedObj$8 = $(c);
const varInitAssignLhsComputedProp$8 = $(`y`);
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
$(100);
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $(`x`);
const varInitAssignLhsComputedObj$9 = $(c);
const varInitAssignLhsComputedProp$9 = $(`y`);
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
$(100);
const varInitAssignLhsComputedObj$10 = $(b);
const varInitAssignLhsComputedProp$10 = $(`x`);
const varInitAssignLhsComputedObj$12 = $(c);
const varInitAssignLhsComputedProp$12 = $(`y`);
varInitAssignLhsComputedObj$12[varInitAssignLhsComputedProp$12] = 3;
varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
$(100);
const varInitAssignLhsComputedObj$11 = $(b);
const varInitAssignLhsComputedProp$11 = $(`x`);
const varInitAssignLhsComputedObj$13 = $(c);
const varInitAssignLhsComputedProp$13 = $(`y`);
varInitAssignLhsComputedObj$13[varInitAssignLhsComputedProp$13] = 3;
varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = 3;
$(100);
const varInitAssignLhsComputedObj$14 = $(b);
const varInitAssignLhsComputedProp$14 = $(`x`);
const varInitAssignLhsComputedObj$16 = $(c);
const varInitAssignLhsComputedProp$16 = $(`y`);
varInitAssignLhsComputedObj$16[varInitAssignLhsComputedProp$16] = 3;
varInitAssignLhsComputedObj$14[varInitAssignLhsComputedProp$14] = 3;
$(100);
const varInitAssignLhsComputedObj$15 = $(b);
const varInitAssignLhsComputedProp$15 = $(`x`);
const varInitAssignLhsComputedObj$17 = $(c);
const varInitAssignLhsComputedProp$17 = $(`y`);
varInitAssignLhsComputedObj$17[varInitAssignLhsComputedProp$17] = 3;
varInitAssignLhsComputedObj$15[varInitAssignLhsComputedProp$15] = 3;
$(100);
const varInitAssignLhsComputedObj$18 = $(b);
const varInitAssignLhsComputedProp$18 = $(`x`);
const varInitAssignLhsComputedObj$20 = $(c);
const varInitAssignLhsComputedProp$20 = $(`y`);
varInitAssignLhsComputedObj$20[varInitAssignLhsComputedProp$20] = 3;
varInitAssignLhsComputedObj$18[varInitAssignLhsComputedProp$18] = 3;
$(100);
const varInitAssignLhsComputedObj$19 = $(b);
const varInitAssignLhsComputedProp$19 = $(`x`);
const varInitAssignLhsComputedObj$21 = $(c);
const varInitAssignLhsComputedProp$21 = $(`y`);
varInitAssignLhsComputedObj$21[varInitAssignLhsComputedProp$21] = 3;
varInitAssignLhsComputedObj$19[varInitAssignLhsComputedProp$19] = 3;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const varInitAssignLhsComputedObj$22 = $(b);
  const varInitAssignLhsComputedProp$22 = $(`x`);
  const varInitAssignLhsComputedObj$24 = $(c);
  const varInitAssignLhsComputedProp$24 = $(`y`);
  varInitAssignLhsComputedObj$24[varInitAssignLhsComputedProp$24] = 3;
  varInitAssignLhsComputedObj$22[varInitAssignLhsComputedProp$22] = 3;
}
$(a, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = {
a: 999,
b: 1000
;
$( 100 );
const d = $( a );
const e = $( "x" );
const f = $( b );
const g = $( "y" );
f[g] = 3;
d[e] = 3;
$( 100 );
const h = $( a );
const i = $( "x" );
const j = $( b );
const k = $( "y" );
j[k] = 3;
h[i] = 3;
$( 100 );
const l = $( a );
const m = $( "x" );
const n = $( b );
const o = $( "y" );
n[o] = 3;
l[m] = 3;
$( 100 );
const p = $( a );
const q = $( "x" );
const r = $( b );
const s = $( "y" );
r[s] = 3;
p[q] = 3;
$( 100 );
const t = $( a );
const u = $( "x" );
const v = $( b );
const w = $( "y" );
v[w] = 3;
t[u] = 3;
$( 100 );
const x = $( a );
const y = $( "x" );
const z = $( b );
const 01 = $( "y" );
z[01] = 3;
x[y] = 3;
$( 100 );
const 11 = $( a );
const 21 = $( "x" );
const 31 = $( b );
const 41 = $( "y" );
31[41] = 3;
11[21] = 3;
$( 100 );
const 51 = $( a );
const 61 = $( "x" );
const 71 = $( b );
const 81 = $( "y" );
71[81] = 3;
51[61] = 3;
$( 100 );
const 91 = $( a );
const a1 = $( "x" );
const b1 = $( b );
const c1 = $( "y" );
b1[c1] = 3;
91[a1] = 3;
$( 100 );
const d1 = $( a );
const e1 = $( "x" );
const f1 = $( b );
const g1 = $( "y" );
f1[g1] = 3;
d1[e1] = 3;
$( 100 );
const h1 = $( a );
const i1 = $( "x" );
const j1 = $( b );
const k1 = $( "y" );
j1[k1] = 3;
h1[i1] = 3;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const l1 = $( a );
  const m1 = $( "x" );
  const n1 = $( b );
  const o1 = $( "y" );
  n1[o1] = 3;
  l1[m1] = 3;
}
$( c, a, b, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 100
 - 7: { x: '3' }
 - 8: 'x'
 - 9: { y: '3' }
 - 10: 'y'
 - 11: 100
 - 12: { x: '3' }
 - 13: 'x'
 - 14: { y: '3' }
 - 15: 'y'
 - 16: 100
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { y: '3' }
 - 20: 'y'
 - 21: 100
 - 22: { x: '3' }
 - 23: 'x'
 - 24: { y: '3' }
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > Do while > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)[$("x")] = $(c)[$("y")] = d + e));
$(a, b, c, d, e);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $(b)[$(`x`)] = $(c)[$(`y`)] = d + e;
  }
}
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $(`x`);
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedProp$1 = $(`y`);
    const varInitAssignLhsComputedRhs$1 = d + e;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
$(100);
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
$(100);
const varInitAssignLhsComputedObj$2 = $(b);
const varInitAssignLhsComputedProp$2 = $(`x`);
const varInitAssignLhsComputedObj$4 = $(c);
const varInitAssignLhsComputedProp$4 = $(`y`);
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 7;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 7;
$(100);
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(c);
const varInitAssignLhsComputedProp$5 = $(`y`);
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 7;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 7;
$(100);
const varInitAssignLhsComputedObj$6 = $(b);
const varInitAssignLhsComputedProp$6 = $(`x`);
const varInitAssignLhsComputedObj$8 = $(c);
const varInitAssignLhsComputedProp$8 = $(`y`);
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 7;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 7;
$(100);
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $(`x`);
const varInitAssignLhsComputedObj$9 = $(c);
const varInitAssignLhsComputedProp$9 = $(`y`);
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 7;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 7;
$(100);
const varInitAssignLhsComputedObj$10 = $(b);
const varInitAssignLhsComputedProp$10 = $(`x`);
const varInitAssignLhsComputedObj$12 = $(c);
const varInitAssignLhsComputedProp$12 = $(`y`);
varInitAssignLhsComputedObj$12[varInitAssignLhsComputedProp$12] = 7;
varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 7;
$(100);
const varInitAssignLhsComputedObj$11 = $(b);
const varInitAssignLhsComputedProp$11 = $(`x`);
const varInitAssignLhsComputedObj$13 = $(c);
const varInitAssignLhsComputedProp$13 = $(`y`);
varInitAssignLhsComputedObj$13[varInitAssignLhsComputedProp$13] = 7;
varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = 7;
$(100);
const varInitAssignLhsComputedObj$14 = $(b);
const varInitAssignLhsComputedProp$14 = $(`x`);
const varInitAssignLhsComputedObj$16 = $(c);
const varInitAssignLhsComputedProp$16 = $(`y`);
varInitAssignLhsComputedObj$16[varInitAssignLhsComputedProp$16] = 7;
varInitAssignLhsComputedObj$14[varInitAssignLhsComputedProp$14] = 7;
$(100);
const varInitAssignLhsComputedObj$15 = $(b);
const varInitAssignLhsComputedProp$15 = $(`x`);
const varInitAssignLhsComputedObj$17 = $(c);
const varInitAssignLhsComputedProp$17 = $(`y`);
varInitAssignLhsComputedObj$17[varInitAssignLhsComputedProp$17] = 7;
varInitAssignLhsComputedObj$15[varInitAssignLhsComputedProp$15] = 7;
$(100);
const varInitAssignLhsComputedObj$18 = $(b);
const varInitAssignLhsComputedProp$18 = $(`x`);
const varInitAssignLhsComputedObj$20 = $(c);
const varInitAssignLhsComputedProp$20 = $(`y`);
varInitAssignLhsComputedObj$20[varInitAssignLhsComputedProp$20] = 7;
varInitAssignLhsComputedObj$18[varInitAssignLhsComputedProp$18] = 7;
$(100);
const varInitAssignLhsComputedObj$19 = $(b);
const varInitAssignLhsComputedProp$19 = $(`x`);
const varInitAssignLhsComputedObj$21 = $(c);
const varInitAssignLhsComputedProp$21 = $(`y`);
varInitAssignLhsComputedObj$21[varInitAssignLhsComputedProp$21] = 7;
varInitAssignLhsComputedObj$19[varInitAssignLhsComputedProp$19] = 7;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const varInitAssignLhsComputedObj$22 = $(b);
  const varInitAssignLhsComputedProp$22 = $(`x`);
  const varInitAssignLhsComputedObj$24 = $(c);
  const varInitAssignLhsComputedProp$24 = $(`y`);
  varInitAssignLhsComputedObj$24[varInitAssignLhsComputedProp$24] = 7;
  varInitAssignLhsComputedObj$22[varInitAssignLhsComputedProp$22] = 7;
}
$(7, b, c, 3, 4);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
$( 100 );
const c = $( a );
const d = $( "x" );
const e = $( b );
const f = $( "y" );
e[f] = 7;
c[d] = 7;
$( 100 );
const g = $( a );
const h = $( "x" );
const i = $( b );
const j = $( "y" );
i[j] = 7;
g[h] = 7;
$( 100 );
const k = $( a );
const l = $( "x" );
const m = $( b );
const n = $( "y" );
m[n] = 7;
k[l] = 7;
$( 100 );
const o = $( a );
const p = $( "x" );
const q = $( b );
const r = $( "y" );
q[r] = 7;
o[p] = 7;
$( 100 );
const s = $( a );
const t = $( "x" );
const u = $( b );
const v = $( "y" );
u[v] = 7;
s[t] = 7;
$( 100 );
const w = $( a );
const x = $( "x" );
const y = $( b );
const z = $( "y" );
y[z] = 7;
w[x] = 7;
$( 100 );
const 01 = $( a );
const 11 = $( "x" );
const 21 = $( b );
const 31 = $( "y" );
21[31] = 7;
01[11] = 7;
$( 100 );
const 41 = $( a );
const 51 = $( "x" );
const 61 = $( b );
const 71 = $( "y" );
61[71] = 7;
41[51] = 7;
$( 100 );
const 81 = $( a );
const 91 = $( "x" );
const a1 = $( b );
const b1 = $( "y" );
a1[b1] = 7;
81[91] = 7;
$( 100 );
const c1 = $( a );
const d1 = $( "x" );
const e1 = $( b );
const f1 = $( "y" );
e1[f1] = 7;
c1[d1] = 7;
$( 100 );
const g1 = $( a );
const h1 = $( "x" );
const i1 = $( b );
const j1 = $( "y" );
i1[j1] = 7;
g1[h1] = 7;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const k1 = $( a );
  const l1 = $( "x" );
  const m1 = $( b );
  const n1 = $( "y" );
  m1[n1] = 7;
  k1[l1] = 7;
}
$( 7, a, b, 3, 4 );
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
 - 7: { x: '7' }
 - 8: 'x'
 - 9: { y: '7' }
 - 10: 'y'
 - 11: 100
 - 12: { x: '7' }
 - 13: 'x'
 - 14: { y: '7' }
 - 15: 'y'
 - 16: 100
 - 17: { x: '7' }
 - 18: 'x'
 - 19: { y: '7' }
 - 20: 'y'
 - 21: 100
 - 22: { x: '7' }
 - 23: 'x'
 - 24: { y: '7' }
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

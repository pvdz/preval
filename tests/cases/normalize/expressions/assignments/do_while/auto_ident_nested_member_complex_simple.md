# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)[$("x")] = $(c)[$("y")] = d));
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
  if ((a = $(b)[$(`x`)] = $(c)[$(`y`)] = d)) {
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
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = d;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpIfTest = a;
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
$(100);
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(100);
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 3;
$(100);
const tmpNestedAssignComMemberObj$2 = $(b);
const tmpNestedAssignComMemberProp$2 = $(`x`);
const varInitAssignLhsComputedObj$2 = $(c);
const varInitAssignLhsComputedProp$2 = $(`y`);
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = 3;
$(100);
const tmpNestedAssignComMemberObj$3 = $(b);
const tmpNestedAssignComMemberProp$3 = $(`x`);
const varInitAssignLhsComputedObj$3 = $(c);
const varInitAssignLhsComputedProp$3 = $(`y`);
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = 3;
$(100);
const tmpNestedAssignComMemberObj$4 = $(b);
const tmpNestedAssignComMemberProp$4 = $(`x`);
const varInitAssignLhsComputedObj$4 = $(c);
const varInitAssignLhsComputedProp$4 = $(`y`);
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = 3;
$(100);
const tmpNestedAssignComMemberObj$5 = $(b);
const tmpNestedAssignComMemberProp$5 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(c);
const varInitAssignLhsComputedProp$5 = $(`y`);
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = 3;
$(100);
const tmpNestedAssignComMemberObj$6 = $(b);
const tmpNestedAssignComMemberProp$6 = $(`x`);
const varInitAssignLhsComputedObj$6 = $(c);
const varInitAssignLhsComputedProp$6 = $(`y`);
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
tmpNestedAssignComMemberObj$6[tmpNestedAssignComMemberProp$6] = 3;
$(100);
const tmpNestedAssignComMemberObj$7 = $(b);
const tmpNestedAssignComMemberProp$7 = $(`x`);
const varInitAssignLhsComputedObj$7 = $(c);
const varInitAssignLhsComputedProp$7 = $(`y`);
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
tmpNestedAssignComMemberObj$7[tmpNestedAssignComMemberProp$7] = 3;
$(100);
const tmpNestedAssignComMemberObj$8 = $(b);
const tmpNestedAssignComMemberProp$8 = $(`x`);
const varInitAssignLhsComputedObj$8 = $(c);
const varInitAssignLhsComputedProp$8 = $(`y`);
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
tmpNestedAssignComMemberObj$8[tmpNestedAssignComMemberProp$8] = 3;
$(100);
const tmpNestedAssignComMemberObj$9 = $(b);
const tmpNestedAssignComMemberProp$9 = $(`x`);
const varInitAssignLhsComputedObj$9 = $(c);
const varInitAssignLhsComputedProp$9 = $(`y`);
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
tmpNestedAssignComMemberObj$9[tmpNestedAssignComMemberProp$9] = 3;
$(100);
const tmpNestedAssignComMemberObj$10 = $(b);
const tmpNestedAssignComMemberProp$10 = $(`x`);
const varInitAssignLhsComputedObj$10 = $(c);
const varInitAssignLhsComputedProp$10 = $(`y`);
varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
tmpNestedAssignComMemberObj$10[tmpNestedAssignComMemberProp$10] = 3;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNestedAssignComMemberObj$11 = $(b);
  const tmpNestedAssignComMemberProp$11 = $(`x`);
  const varInitAssignLhsComputedObj$11 = $(c);
  const varInitAssignLhsComputedProp$11 = $(`y`);
  varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = 3;
  tmpNestedAssignComMemberObj$11[tmpNestedAssignComMemberProp$11] = 3;
}
$(3, b, c, 3);
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
e[f] = 3;
c[d] = 3;
$( 100 );
const g = $( a );
const h = $( "x" );
const i = $( b );
const j = $( "y" );
i[j] = 3;
g[h] = 3;
$( 100 );
const k = $( a );
const l = $( "x" );
const m = $( b );
const n = $( "y" );
m[n] = 3;
k[l] = 3;
$( 100 );
const o = $( a );
const p = $( "x" );
const q = $( b );
const r = $( "y" );
q[r] = 3;
o[p] = 3;
$( 100 );
const s = $( a );
const t = $( "x" );
const u = $( b );
const v = $( "y" );
u[v] = 3;
s[t] = 3;
$( 100 );
const w = $( a );
const x = $( "x" );
const y = $( b );
const z = $( "y" );
y[z] = 3;
w[x] = 3;
$( 100 );
const 01 = $( a );
const 11 = $( "x" );
const 21 = $( b );
const 31 = $( "y" );
21[31] = 3;
01[11] = 3;
$( 100 );
const 41 = $( a );
const 51 = $( "x" );
const 61 = $( b );
const 71 = $( "y" );
61[71] = 3;
41[51] = 3;
$( 100 );
const 81 = $( a );
const 91 = $( "x" );
const a1 = $( b );
const b1 = $( "y" );
a1[b1] = 3;
81[91] = 3;
$( 100 );
const c1 = $( a );
const d1 = $( "x" );
const e1 = $( b );
const f1 = $( "y" );
e1[f1] = 3;
c1[d1] = 3;
$( 100 );
const g1 = $( a );
const h1 = $( "x" );
const i1 = $( b );
const j1 = $( "y" );
i1[j1] = 3;
g1[h1] = 3;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const k1 = $( a );
  const l1 = $( "x" );
  const m1 = $( b );
  const n1 = $( "y" );
  m1[n1] = 3;
  k1[l1] = 3;
}
$( 3, a, b, 3 );
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

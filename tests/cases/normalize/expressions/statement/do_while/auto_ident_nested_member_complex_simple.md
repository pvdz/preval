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
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $(b)[$(`x`)] = $(c)[$(`y`)] = d;
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
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
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
    tmpDoWhileFlag = tmpNestedPropAssignRhs;
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

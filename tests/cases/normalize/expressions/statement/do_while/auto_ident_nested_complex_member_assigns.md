# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Do while > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (
  ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c)
);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c;
  }
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $(`x`);
    const varInitAssignLhsComputedObj$1 = $(b);
    const varInitAssignLhsComputedProp$1 = $(`x`);
    const varInitAssignLhsComputedObj$3 = $(b);
    const varInitAssignLhsComputedProp$3 = $(`x`);
    const varInitAssignLhsComputedObj$5 = $(b);
    const varInitAssignLhsComputedProp$5 = $(`x`);
    const varInitAssignLhsComputedObj$7 = $(b);
    const varInitAssignLhsComputedProp$7 = $(`x`);
    const varInitAssignLhsComputedRhs$7 = c;
    varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
    const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
    varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
    const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
    const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    tmpDoWhileFlag = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
$(100);
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(b);
const varInitAssignLhsComputedProp$1 = $(`x`);
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $(`x`);
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $(`x`);
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(100);
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $(`x`);
const varInitAssignLhsComputedObj$2 = $(b);
const varInitAssignLhsComputedProp$2 = $(`x`);
const varInitAssignLhsComputedObj$4 = $(b);
const varInitAssignLhsComputedProp$4 = $(`x`);
const varInitAssignLhsComputedObj$6 = $(b);
const varInitAssignLhsComputedProp$6 = $(`x`);
const varInitAssignLhsComputedObj$8 = $(b);
const varInitAssignLhsComputedProp$8 = $(`x`);
const varInitAssignLhsComputedObj$10 = $(b);
const varInitAssignLhsComputedProp$10 = $(`x`);
varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 3;
$(100);
const tmpNestedAssignComMemberObj$2 = $(b);
const tmpNestedAssignComMemberProp$2 = $(`x`);
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $(`x`);
const varInitAssignLhsComputedObj$11 = $(b);
const varInitAssignLhsComputedProp$11 = $(`x`);
const varInitAssignLhsComputedObj$13 = $(b);
const varInitAssignLhsComputedProp$13 = $(`x`);
const varInitAssignLhsComputedObj$15 = $(b);
const varInitAssignLhsComputedProp$15 = $(`x`);
const varInitAssignLhsComputedObj$17 = $(b);
const varInitAssignLhsComputedProp$17 = $(`x`);
varInitAssignLhsComputedObj$17[varInitAssignLhsComputedProp$17] = 3;
varInitAssignLhsComputedObj$15[varInitAssignLhsComputedProp$15] = 3;
varInitAssignLhsComputedObj$13[varInitAssignLhsComputedProp$13] = 3;
varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = 3;
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = 3;
$(100);
const tmpNestedAssignComMemberObj$3 = $(b);
const tmpNestedAssignComMemberProp$3 = $(`x`);
const varInitAssignLhsComputedObj$12 = $(b);
const varInitAssignLhsComputedProp$12 = $(`x`);
const varInitAssignLhsComputedObj$14 = $(b);
const varInitAssignLhsComputedProp$14 = $(`x`);
const varInitAssignLhsComputedObj$16 = $(b);
const varInitAssignLhsComputedProp$16 = $(`x`);
const varInitAssignLhsComputedObj$18 = $(b);
const varInitAssignLhsComputedProp$18 = $(`x`);
const varInitAssignLhsComputedObj$20 = $(b);
const varInitAssignLhsComputedProp$20 = $(`x`);
varInitAssignLhsComputedObj$20[varInitAssignLhsComputedProp$20] = 3;
varInitAssignLhsComputedObj$18[varInitAssignLhsComputedProp$18] = 3;
varInitAssignLhsComputedObj$16[varInitAssignLhsComputedProp$16] = 3;
varInitAssignLhsComputedObj$14[varInitAssignLhsComputedProp$14] = 3;
varInitAssignLhsComputedObj$12[varInitAssignLhsComputedProp$12] = 3;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = 3;
$(100);
const tmpNestedAssignComMemberObj$4 = $(b);
const tmpNestedAssignComMemberProp$4 = $(`x`);
const varInitAssignLhsComputedObj$19 = $(b);
const varInitAssignLhsComputedProp$19 = $(`x`);
const varInitAssignLhsComputedObj$21 = $(b);
const varInitAssignLhsComputedProp$21 = $(`x`);
const varInitAssignLhsComputedObj$23 = $(b);
const varInitAssignLhsComputedProp$23 = $(`x`);
const varInitAssignLhsComputedObj$25 = $(b);
const varInitAssignLhsComputedProp$25 = $(`x`);
const varInitAssignLhsComputedObj$27 = $(b);
const varInitAssignLhsComputedProp$27 = $(`x`);
varInitAssignLhsComputedObj$27[varInitAssignLhsComputedProp$27] = 3;
varInitAssignLhsComputedObj$25[varInitAssignLhsComputedProp$25] = 3;
varInitAssignLhsComputedObj$23[varInitAssignLhsComputedProp$23] = 3;
varInitAssignLhsComputedObj$21[varInitAssignLhsComputedProp$21] = 3;
varInitAssignLhsComputedObj$19[varInitAssignLhsComputedProp$19] = 3;
tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = 3;
$(100);
const tmpNestedAssignComMemberObj$5 = $(b);
const tmpNestedAssignComMemberProp$5 = $(`x`);
const varInitAssignLhsComputedObj$22 = $(b);
const varInitAssignLhsComputedProp$22 = $(`x`);
const varInitAssignLhsComputedObj$24 = $(b);
const varInitAssignLhsComputedProp$24 = $(`x`);
const varInitAssignLhsComputedObj$26 = $(b);
const varInitAssignLhsComputedProp$26 = $(`x`);
const varInitAssignLhsComputedObj$28 = $(b);
const varInitAssignLhsComputedProp$28 = $(`x`);
const varInitAssignLhsComputedObj$30 = $(b);
const varInitAssignLhsComputedProp$30 = $(`x`);
varInitAssignLhsComputedObj$30[varInitAssignLhsComputedProp$30] = 3;
varInitAssignLhsComputedObj$28[varInitAssignLhsComputedProp$28] = 3;
varInitAssignLhsComputedObj$26[varInitAssignLhsComputedProp$26] = 3;
varInitAssignLhsComputedObj$24[varInitAssignLhsComputedProp$24] = 3;
varInitAssignLhsComputedObj$22[varInitAssignLhsComputedProp$22] = 3;
tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = 3;
$(100);
const tmpNestedAssignComMemberObj$6 = $(b);
const tmpNestedAssignComMemberProp$6 = $(`x`);
const varInitAssignLhsComputedObj$29 = $(b);
const varInitAssignLhsComputedProp$29 = $(`x`);
const varInitAssignLhsComputedObj$31 = $(b);
const varInitAssignLhsComputedProp$31 = $(`x`);
const varInitAssignLhsComputedObj$33 = $(b);
const varInitAssignLhsComputedProp$33 = $(`x`);
const varInitAssignLhsComputedObj$35 = $(b);
const varInitAssignLhsComputedProp$35 = $(`x`);
const varInitAssignLhsComputedObj$37 = $(b);
const varInitAssignLhsComputedProp$37 = $(`x`);
varInitAssignLhsComputedObj$37[varInitAssignLhsComputedProp$37] = 3;
varInitAssignLhsComputedObj$35[varInitAssignLhsComputedProp$35] = 3;
varInitAssignLhsComputedObj$33[varInitAssignLhsComputedProp$33] = 3;
varInitAssignLhsComputedObj$31[varInitAssignLhsComputedProp$31] = 3;
varInitAssignLhsComputedObj$29[varInitAssignLhsComputedProp$29] = 3;
tmpNestedAssignComMemberObj$6[tmpNestedAssignComMemberProp$6] = 3;
$(100);
const tmpNestedAssignComMemberObj$7 = $(b);
const tmpNestedAssignComMemberProp$7 = $(`x`);
const varInitAssignLhsComputedObj$32 = $(b);
const varInitAssignLhsComputedProp$32 = $(`x`);
const varInitAssignLhsComputedObj$34 = $(b);
const varInitAssignLhsComputedProp$34 = $(`x`);
const varInitAssignLhsComputedObj$36 = $(b);
const varInitAssignLhsComputedProp$36 = $(`x`);
const varInitAssignLhsComputedObj$38 = $(b);
const varInitAssignLhsComputedProp$38 = $(`x`);
const varInitAssignLhsComputedObj$40 = $(b);
const varInitAssignLhsComputedProp$40 = $(`x`);
varInitAssignLhsComputedObj$40[varInitAssignLhsComputedProp$40] = 3;
varInitAssignLhsComputedObj$38[varInitAssignLhsComputedProp$38] = 3;
varInitAssignLhsComputedObj$36[varInitAssignLhsComputedProp$36] = 3;
varInitAssignLhsComputedObj$34[varInitAssignLhsComputedProp$34] = 3;
varInitAssignLhsComputedObj$32[varInitAssignLhsComputedProp$32] = 3;
tmpNestedAssignComMemberObj$7[tmpNestedAssignComMemberProp$7] = 3;
$(100);
const tmpNestedAssignComMemberObj$8 = $(b);
const tmpNestedAssignComMemberProp$8 = $(`x`);
const varInitAssignLhsComputedObj$39 = $(b);
const varInitAssignLhsComputedProp$39 = $(`x`);
const varInitAssignLhsComputedObj$41 = $(b);
const varInitAssignLhsComputedProp$41 = $(`x`);
const varInitAssignLhsComputedObj$43 = $(b);
const varInitAssignLhsComputedProp$43 = $(`x`);
const varInitAssignLhsComputedObj$45 = $(b);
const varInitAssignLhsComputedProp$45 = $(`x`);
const varInitAssignLhsComputedObj$47 = $(b);
const varInitAssignLhsComputedProp$47 = $(`x`);
varInitAssignLhsComputedObj$47[varInitAssignLhsComputedProp$47] = 3;
varInitAssignLhsComputedObj$45[varInitAssignLhsComputedProp$45] = 3;
varInitAssignLhsComputedObj$43[varInitAssignLhsComputedProp$43] = 3;
varInitAssignLhsComputedObj$41[varInitAssignLhsComputedProp$41] = 3;
varInitAssignLhsComputedObj$39[varInitAssignLhsComputedProp$39] = 3;
tmpNestedAssignComMemberObj$8[tmpNestedAssignComMemberProp$8] = 3;
$(100);
const tmpNestedAssignComMemberObj$9 = $(b);
const tmpNestedAssignComMemberProp$9 = $(`x`);
const varInitAssignLhsComputedObj$42 = $(b);
const varInitAssignLhsComputedProp$42 = $(`x`);
const varInitAssignLhsComputedObj$44 = $(b);
const varInitAssignLhsComputedProp$44 = $(`x`);
const varInitAssignLhsComputedObj$46 = $(b);
const varInitAssignLhsComputedProp$46 = $(`x`);
const varInitAssignLhsComputedObj$48 = $(b);
const varInitAssignLhsComputedProp$48 = $(`x`);
const varInitAssignLhsComputedObj$50 = $(b);
const varInitAssignLhsComputedProp$50 = $(`x`);
varInitAssignLhsComputedObj$50[varInitAssignLhsComputedProp$50] = 3;
varInitAssignLhsComputedObj$48[varInitAssignLhsComputedProp$48] = 3;
varInitAssignLhsComputedObj$46[varInitAssignLhsComputedProp$46] = 3;
varInitAssignLhsComputedObj$44[varInitAssignLhsComputedProp$44] = 3;
varInitAssignLhsComputedObj$42[varInitAssignLhsComputedProp$42] = 3;
tmpNestedAssignComMemberObj$9[tmpNestedAssignComMemberProp$9] = 3;
$(100);
const tmpNestedAssignComMemberObj$10 = $(b);
const tmpNestedAssignComMemberProp$10 = $(`x`);
const varInitAssignLhsComputedObj$49 = $(b);
const varInitAssignLhsComputedProp$49 = $(`x`);
const varInitAssignLhsComputedObj$51 = $(b);
const varInitAssignLhsComputedProp$51 = $(`x`);
const varInitAssignLhsComputedObj$53 = $(b);
const varInitAssignLhsComputedProp$53 = $(`x`);
const varInitAssignLhsComputedObj$55 = $(b);
const varInitAssignLhsComputedProp$55 = $(`x`);
const varInitAssignLhsComputedObj$57 = $(b);
const varInitAssignLhsComputedProp$57 = $(`x`);
varInitAssignLhsComputedObj$57[varInitAssignLhsComputedProp$57] = 3;
varInitAssignLhsComputedObj$55[varInitAssignLhsComputedProp$55] = 3;
varInitAssignLhsComputedObj$53[varInitAssignLhsComputedProp$53] = 3;
varInitAssignLhsComputedObj$51[varInitAssignLhsComputedProp$51] = 3;
varInitAssignLhsComputedObj$49[varInitAssignLhsComputedProp$49] = 3;
tmpNestedAssignComMemberObj$10[tmpNestedAssignComMemberProp$10] = 3;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNestedAssignComMemberObj$11 = $(b);
  const tmpNestedAssignComMemberProp$11 = $(`x`);
  const varInitAssignLhsComputedObj$52 = $(b);
  const varInitAssignLhsComputedProp$52 = $(`x`);
  const varInitAssignLhsComputedObj$54 = $(b);
  const varInitAssignLhsComputedProp$54 = $(`x`);
  const varInitAssignLhsComputedObj$56 = $(b);
  const varInitAssignLhsComputedProp$56 = $(`x`);
  const varInitAssignLhsComputedObj$58 = $(b);
  const varInitAssignLhsComputedProp$58 = $(`x`);
  const varInitAssignLhsComputedObj$60 = $(b);
  const varInitAssignLhsComputedProp$60 = $(`x`);
  varInitAssignLhsComputedObj$60[varInitAssignLhsComputedProp$60] = 3;
  varInitAssignLhsComputedObj$58[varInitAssignLhsComputedProp$58] = 3;
  varInitAssignLhsComputedObj$56[varInitAssignLhsComputedProp$56] = 3;
  varInitAssignLhsComputedObj$54[varInitAssignLhsComputedProp$54] = 3;
  varInitAssignLhsComputedObj$52[varInitAssignLhsComputedProp$52] = 3;
  tmpNestedAssignComMemberObj$11[tmpNestedAssignComMemberProp$11] = 3;
}
$(a, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
$( 100 );
const c = $( a );
const d = $( "x" );
const e = $( a );
const f = $( "x" );
const g = $( a );
const h = $( "x" );
const i = $( a );
const j = $( "x" );
const k = $( a );
const l = $( "x" );
const m = $( a );
const n = $( "x" );
m[n] = 3;
k[l] = 3;
i[j] = 3;
g[h] = 3;
e[f] = 3;
c[d] = 3;
$( 100 );
const o = $( a );
const p = $( "x" );
const q = $( a );
const r = $( "x" );
const s = $( a );
const t = $( "x" );
const u = $( a );
const v = $( "x" );
const w = $( a );
const x = $( "x" );
const y = $( a );
const z = $( "x" );
y[z] = 3;
w[x] = 3;
u[v] = 3;
s[t] = 3;
q[r] = 3;
o[p] = 3;
$( 100 );
const 01 = $( a );
const 11 = $( "x" );
const 21 = $( a );
const 31 = $( "x" );
const 41 = $( a );
const 51 = $( "x" );
const 61 = $( a );
const 71 = $( "x" );
const 81 = $( a );
const 91 = $( "x" );
const a1 = $( a );
const b1 = $( "x" );
a1[b1] = 3;
81[91] = 3;
61[71] = 3;
41[51] = 3;
21[31] = 3;
01[11] = 3;
$( 100 );
const c1 = $( a );
const d1 = $( "x" );
const e1 = $( a );
const f1 = $( "x" );
const g1 = $( a );
const h1 = $( "x" );
const i1 = $( a );
const j1 = $( "x" );
const k1 = $( a );
const l1 = $( "x" );
const m1 = $( a );
const n1 = $( "x" );
m1[n1] = 3;
k1[l1] = 3;
i1[j1] = 3;
g1[h1] = 3;
e1[f1] = 3;
c1[d1] = 3;
$( 100 );
const o1 = $( a );
const p1 = $( "x" );
const q1 = $( a );
const r1 = $( "x" );
const s1 = $( a );
const t1 = $( "x" );
const u1 = $( a );
const v1 = $( "x" );
const w1 = $( a );
const x1 = $( "x" );
const y1 = $( a );
const z1 = $( "x" );
y1[z1] = 3;
w1[x1] = 3;
u1[v1] = 3;
s1[t1] = 3;
q1[r1] = 3;
o1[p1] = 3;
$( 100 );
const 02 = $( a );
const 12 = $( "x" );
const 22 = $( a );
const 32 = $( "x" );
const 42 = $( a );
const 52 = $( "x" );
const 62 = $( a );
const 72 = $( "x" );
const 82 = $( a );
const 92 = $( "x" );
const a2 = $( a );
const b2 = $( "x" );
a2[b2] = 3;
82[92] = 3;
62[72] = 3;
42[52] = 3;
22[32] = 3;
02[12] = 3;
$( 100 );
const c2 = $( a );
const d2 = $( "x" );
const e2 = $( a );
const f2 = $( "x" );
const g2 = $( a );
const h2 = $( "x" );
const i2 = $( a );
const j2 = $( "x" );
const k2 = $( a );
const l2 = $( "x" );
const m2 = $( a );
const n2 = $( "x" );
m2[n2] = 3;
k2[l2] = 3;
i2[j2] = 3;
g2[h2] = 3;
e2[f2] = 3;
c2[d2] = 3;
$( 100 );
const o2 = $( a );
const p2 = $( "x" );
const q2 = $( a );
const r2 = $( "x" );
const s2 = $( a );
const t2 = $( "x" );
const u2 = $( a );
const v2 = $( "x" );
const w2 = $( a );
const x2 = $( "x" );
const y2 = $( a );
const z2 = $( "x" );
y2[z2] = 3;
w2[x2] = 3;
u2[v2] = 3;
s2[t2] = 3;
q2[r2] = 3;
o2[p2] = 3;
$( 100 );
const 03 = $( a );
const 13 = $( "x" );
const 23 = $( a );
const 33 = $( "x" );
const 43 = $( a );
const 53 = $( "x" );
const 63 = $( a );
const 73 = $( "x" );
const 83 = $( a );
const 93 = $( "x" );
const a3 = $( a );
const b3 = $( "x" );
a3[b3] = 3;
83[93] = 3;
63[73] = 3;
43[53] = 3;
23[33] = 3;
03[13] = 3;
$( 100 );
const c3 = $( a );
const d3 = $( "x" );
const e3 = $( a );
const f3 = $( "x" );
const g3 = $( a );
const h3 = $( "x" );
const i3 = $( a );
const j3 = $( "x" );
const k3 = $( a );
const l3 = $( "x" );
const m3 = $( a );
const n3 = $( "x" );
m3[n3] = 3;
k3[l3] = 3;
i3[j3] = 3;
g3[h3] = 3;
e3[f3] = 3;
c3[d3] = 3;
$( 100 );
const o3 = $( a );
const p3 = $( "x" );
const q3 = $( a );
const r3 = $( "x" );
const s3 = $( a );
const t3 = $( "x" );
const u3 = $( a );
const v3 = $( "x" );
const w3 = $( a );
const x3 = $( "x" );
const y3 = $( a );
const z3 = $( "x" );
y3[z3] = 3;
w3[x3] = 3;
u3[v3] = 3;
s3[t3] = 3;
q3[r3] = 3;
o3[p3] = 3;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const 04 = $( a );
  const 14 = $( "x" );
  const 24 = $( a );
  const 34 = $( "x" );
  const 44 = $( a );
  const 54 = $( "x" );
  const 64 = $( a );
  const 74 = $( "x" );
  const 84 = $( a );
  const 94 = $( "x" );
  const a4 = $( a );
  const b4 = $( "x" );
  a4[b4] = 3;
  84[94] = 3;
  64[74] = 3;
  44[54] = 3;
  24[34] = 3;
  04[14] = 3;
}
$( b, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - 14: 100
 - 15: { x: '3' }
 - 16: 'x'
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { x: '3' }
 - 22: 'x'
 - 23: { x: '3' }
 - 24: 'x'
 - 25: { x: '3' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

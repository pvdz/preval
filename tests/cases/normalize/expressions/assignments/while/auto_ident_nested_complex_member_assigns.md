# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > While > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
while (
  (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c)
)
  $(100);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
while ((a = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c)) $(100);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
while (true) {
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
  a = tmpNestedPropAssignRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
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
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
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
  $(100);
}
$(3, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = $( a );
const e = $( "x" );
const f = $( a );
const g = $( "x" );
const h = $( a );
const i = $( "x" );
const j = $( a );
const k = $( "x" );
const l = $( a );
const m = $( "x" );
l[m] = 3;
j[k] = 3;
h[i] = 3;
f[g] = 3;
d[e] = 3;
b[c] = 3;
$( 100 );
const n = $( a );
const o = $( "x" );
const p = $( a );
const q = $( "x" );
const r = $( a );
const s = $( "x" );
const t = $( a );
const u = $( "x" );
const v = $( a );
const w = $( "x" );
const x = $( a );
const y = $( "x" );
x[y] = 3;
v[w] = 3;
t[u] = 3;
r[s] = 3;
p[q] = 3;
n[o] = 3;
$( 100 );
const z = $( a );
const 01 = $( "x" );
const 11 = $( a );
const 21 = $( "x" );
const 31 = $( a );
const 41 = $( "x" );
const 51 = $( a );
const 61 = $( "x" );
const 71 = $( a );
const 81 = $( "x" );
const 91 = $( a );
const a1 = $( "x" );
91[a1] = 3;
71[81] = 3;
51[61] = 3;
31[41] = 3;
11[21] = 3;
z[01] = 3;
$( 100 );
const b1 = $( a );
const c1 = $( "x" );
const d1 = $( a );
const e1 = $( "x" );
const f1 = $( a );
const g1 = $( "x" );
const h1 = $( a );
const i1 = $( "x" );
const j1 = $( a );
const k1 = $( "x" );
const l1 = $( a );
const m1 = $( "x" );
l1[m1] = 3;
j1[k1] = 3;
h1[i1] = 3;
f1[g1] = 3;
d1[e1] = 3;
b1[c1] = 3;
$( 100 );
const n1 = $( a );
const o1 = $( "x" );
const p1 = $( a );
const q1 = $( "x" );
const r1 = $( a );
const s1 = $( "x" );
const t1 = $( a );
const u1 = $( "x" );
const v1 = $( a );
const w1 = $( "x" );
const x1 = $( a );
const y1 = $( "x" );
x1[y1] = 3;
v1[w1] = 3;
t1[u1] = 3;
r1[s1] = 3;
p1[q1] = 3;
n1[o1] = 3;
$( 100 );
const z1 = $( a );
const 02 = $( "x" );
const 12 = $( a );
const 22 = $( "x" );
const 32 = $( a );
const 42 = $( "x" );
const 52 = $( a );
const 62 = $( "x" );
const 72 = $( a );
const 82 = $( "x" );
const 92 = $( a );
const a2 = $( "x" );
92[a2] = 3;
72[82] = 3;
52[62] = 3;
32[42] = 3;
12[22] = 3;
z1[02] = 3;
$( 100 );
const b2 = $( a );
const c2 = $( "x" );
const d2 = $( a );
const e2 = $( "x" );
const f2 = $( a );
const g2 = $( "x" );
const h2 = $( a );
const i2 = $( "x" );
const j2 = $( a );
const k2 = $( "x" );
const l2 = $( a );
const m2 = $( "x" );
l2[m2] = 3;
j2[k2] = 3;
h2[i2] = 3;
f2[g2] = 3;
d2[e2] = 3;
b2[c2] = 3;
$( 100 );
const n2 = $( a );
const o2 = $( "x" );
const p2 = $( a );
const q2 = $( "x" );
const r2 = $( a );
const s2 = $( "x" );
const t2 = $( a );
const u2 = $( "x" );
const v2 = $( a );
const w2 = $( "x" );
const x2 = $( a );
const y2 = $( "x" );
x2[y2] = 3;
v2[w2] = 3;
t2[u2] = 3;
r2[s2] = 3;
p2[q2] = 3;
n2[o2] = 3;
$( 100 );
const z2 = $( a );
const 03 = $( "x" );
const 13 = $( a );
const 23 = $( "x" );
const 33 = $( a );
const 43 = $( "x" );
const 53 = $( a );
const 63 = $( "x" );
const 73 = $( a );
const 83 = $( "x" );
const 93 = $( a );
const a3 = $( "x" );
93[a3] = 3;
73[83] = 3;
53[63] = 3;
33[43] = 3;
13[23] = 3;
z2[03] = 3;
$( 100 );
const b3 = $( a );
const c3 = $( "x" );
const d3 = $( a );
const e3 = $( "x" );
const f3 = $( a );
const g3 = $( "x" );
const h3 = $( a );
const i3 = $( "x" );
const j3 = $( a );
const k3 = $( "x" );
const l3 = $( a );
const m3 = $( "x" );
l3[m3] = 3;
j3[k3] = 3;
h3[i3] = 3;
f3[g3] = 3;
d3[e3] = 3;
b3[c3] = 3;
$( 100 );
const n3 = $( a );
const o3 = $( "x" );
const p3 = $( a );
const q3 = $( "x" );
const r3 = $( a );
const s3 = $( "x" );
const t3 = $( a );
const u3 = $( "x" );
const v3 = $( a );
const w3 = $( "x" );
const x3 = $( a );
const y3 = $( "x" );
x3[y3] = 3;
v3[w3] = 3;
t3[u3] = 3;
r3[s3] = 3;
p3[q3] = 3;
n3[o3] = 3;
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const z3 = $( a );
  const 04 = $( "x" );
  const 14 = $( a );
  const 24 = $( "x" );
  const 34 = $( a );
  const 44 = $( "x" );
  const 54 = $( a );
  const 64 = $( "x" );
  const 74 = $( a );
  const 84 = $( "x" );
  const 94 = $( a );
  const a4 = $( "x" );
  94[a4] = 3;
  74[84] = 3;
  54[64] = 3;
  34[44] = 3;
  14[24] = 3;
  z3[04] = 3;
  $( 100 );
}
$( 3, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { x: '1' }
 - 6: 'x'
 - 7: { x: '1' }
 - 8: 'x'
 - 9: { x: '1' }
 - 10: 'x'
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 100
 - 14: { x: '3' }
 - 15: 'x'
 - 16: { x: '3' }
 - 17: 'x'
 - 18: { x: '3' }
 - 19: 'x'
 - 20: { x: '3' }
 - 21: 'x'
 - 22: { x: '3' }
 - 23: 'x'
 - 24: { x: '3' }
 - 25: 'x'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

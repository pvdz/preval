# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > For b > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (
  ;
  ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c);
  $(1)
);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  while (($(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c)) {
    $(1);
  }
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
while (true) {
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
  const varInitAssignLhsComputedObj$9 = $(b);
  const varInitAssignLhsComputedProp$9 = $(`x`);
  const varInitAssignLhsComputedRhs$9 = c;
  varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = varInitAssignLhsComputedRhs$9;
  const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$9;
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
  const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpIfTest = varInitAssignLhsComputedRhs;
  if (tmpIfTest) {
    $(1);
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
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $(`x`);
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
$(1);
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
const varInitAssignLhsComputedObj$12 = $(b);
const varInitAssignLhsComputedProp$12 = $(`x`);
varInitAssignLhsComputedObj$12[varInitAssignLhsComputedProp$12] = 3;
varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
$(1);
const varInitAssignLhsComputedObj$11 = $(b);
const varInitAssignLhsComputedProp$11 = $(`x`);
const varInitAssignLhsComputedObj$13 = $(b);
const varInitAssignLhsComputedProp$13 = $(`x`);
const varInitAssignLhsComputedObj$15 = $(b);
const varInitAssignLhsComputedProp$15 = $(`x`);
const varInitAssignLhsComputedObj$17 = $(b);
const varInitAssignLhsComputedProp$17 = $(`x`);
const varInitAssignLhsComputedObj$19 = $(b);
const varInitAssignLhsComputedProp$19 = $(`x`);
const varInitAssignLhsComputedObj$21 = $(b);
const varInitAssignLhsComputedProp$21 = $(`x`);
varInitAssignLhsComputedObj$21[varInitAssignLhsComputedProp$21] = 3;
varInitAssignLhsComputedObj$19[varInitAssignLhsComputedProp$19] = 3;
varInitAssignLhsComputedObj$17[varInitAssignLhsComputedProp$17] = 3;
varInitAssignLhsComputedObj$15[varInitAssignLhsComputedProp$15] = 3;
varInitAssignLhsComputedObj$13[varInitAssignLhsComputedProp$13] = 3;
varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = 3;
$(1);
const varInitAssignLhsComputedObj$14 = $(b);
const varInitAssignLhsComputedProp$14 = $(`x`);
const varInitAssignLhsComputedObj$16 = $(b);
const varInitAssignLhsComputedProp$16 = $(`x`);
const varInitAssignLhsComputedObj$18 = $(b);
const varInitAssignLhsComputedProp$18 = $(`x`);
const varInitAssignLhsComputedObj$20 = $(b);
const varInitAssignLhsComputedProp$20 = $(`x`);
const varInitAssignLhsComputedObj$22 = $(b);
const varInitAssignLhsComputedProp$22 = $(`x`);
const varInitAssignLhsComputedObj$24 = $(b);
const varInitAssignLhsComputedProp$24 = $(`x`);
varInitAssignLhsComputedObj$24[varInitAssignLhsComputedProp$24] = 3;
varInitAssignLhsComputedObj$22[varInitAssignLhsComputedProp$22] = 3;
varInitAssignLhsComputedObj$20[varInitAssignLhsComputedProp$20] = 3;
varInitAssignLhsComputedObj$18[varInitAssignLhsComputedProp$18] = 3;
varInitAssignLhsComputedObj$16[varInitAssignLhsComputedProp$16] = 3;
varInitAssignLhsComputedObj$14[varInitAssignLhsComputedProp$14] = 3;
$(1);
const varInitAssignLhsComputedObj$23 = $(b);
const varInitAssignLhsComputedProp$23 = $(`x`);
const varInitAssignLhsComputedObj$25 = $(b);
const varInitAssignLhsComputedProp$25 = $(`x`);
const varInitAssignLhsComputedObj$27 = $(b);
const varInitAssignLhsComputedProp$27 = $(`x`);
const varInitAssignLhsComputedObj$29 = $(b);
const varInitAssignLhsComputedProp$29 = $(`x`);
const varInitAssignLhsComputedObj$31 = $(b);
const varInitAssignLhsComputedProp$31 = $(`x`);
const varInitAssignLhsComputedObj$33 = $(b);
const varInitAssignLhsComputedProp$33 = $(`x`);
varInitAssignLhsComputedObj$33[varInitAssignLhsComputedProp$33] = 3;
varInitAssignLhsComputedObj$31[varInitAssignLhsComputedProp$31] = 3;
varInitAssignLhsComputedObj$29[varInitAssignLhsComputedProp$29] = 3;
varInitAssignLhsComputedObj$27[varInitAssignLhsComputedProp$27] = 3;
varInitAssignLhsComputedObj$25[varInitAssignLhsComputedProp$25] = 3;
varInitAssignLhsComputedObj$23[varInitAssignLhsComputedProp$23] = 3;
$(1);
const varInitAssignLhsComputedObj$26 = $(b);
const varInitAssignLhsComputedProp$26 = $(`x`);
const varInitAssignLhsComputedObj$28 = $(b);
const varInitAssignLhsComputedProp$28 = $(`x`);
const varInitAssignLhsComputedObj$30 = $(b);
const varInitAssignLhsComputedProp$30 = $(`x`);
const varInitAssignLhsComputedObj$32 = $(b);
const varInitAssignLhsComputedProp$32 = $(`x`);
const varInitAssignLhsComputedObj$34 = $(b);
const varInitAssignLhsComputedProp$34 = $(`x`);
const varInitAssignLhsComputedObj$36 = $(b);
const varInitAssignLhsComputedProp$36 = $(`x`);
varInitAssignLhsComputedObj$36[varInitAssignLhsComputedProp$36] = 3;
varInitAssignLhsComputedObj$34[varInitAssignLhsComputedProp$34] = 3;
varInitAssignLhsComputedObj$32[varInitAssignLhsComputedProp$32] = 3;
varInitAssignLhsComputedObj$30[varInitAssignLhsComputedProp$30] = 3;
varInitAssignLhsComputedObj$28[varInitAssignLhsComputedProp$28] = 3;
varInitAssignLhsComputedObj$26[varInitAssignLhsComputedProp$26] = 3;
$(1);
const varInitAssignLhsComputedObj$35 = $(b);
const varInitAssignLhsComputedProp$35 = $(`x`);
const varInitAssignLhsComputedObj$37 = $(b);
const varInitAssignLhsComputedProp$37 = $(`x`);
const varInitAssignLhsComputedObj$39 = $(b);
const varInitAssignLhsComputedProp$39 = $(`x`);
const varInitAssignLhsComputedObj$41 = $(b);
const varInitAssignLhsComputedProp$41 = $(`x`);
const varInitAssignLhsComputedObj$43 = $(b);
const varInitAssignLhsComputedProp$43 = $(`x`);
const varInitAssignLhsComputedObj$45 = $(b);
const varInitAssignLhsComputedProp$45 = $(`x`);
varInitAssignLhsComputedObj$45[varInitAssignLhsComputedProp$45] = 3;
varInitAssignLhsComputedObj$43[varInitAssignLhsComputedProp$43] = 3;
varInitAssignLhsComputedObj$41[varInitAssignLhsComputedProp$41] = 3;
varInitAssignLhsComputedObj$39[varInitAssignLhsComputedProp$39] = 3;
varInitAssignLhsComputedObj$37[varInitAssignLhsComputedProp$37] = 3;
varInitAssignLhsComputedObj$35[varInitAssignLhsComputedProp$35] = 3;
$(1);
const varInitAssignLhsComputedObj$38 = $(b);
const varInitAssignLhsComputedProp$38 = $(`x`);
const varInitAssignLhsComputedObj$40 = $(b);
const varInitAssignLhsComputedProp$40 = $(`x`);
const varInitAssignLhsComputedObj$42 = $(b);
const varInitAssignLhsComputedProp$42 = $(`x`);
const varInitAssignLhsComputedObj$44 = $(b);
const varInitAssignLhsComputedProp$44 = $(`x`);
const varInitAssignLhsComputedObj$46 = $(b);
const varInitAssignLhsComputedProp$46 = $(`x`);
const varInitAssignLhsComputedObj$48 = $(b);
const varInitAssignLhsComputedProp$48 = $(`x`);
varInitAssignLhsComputedObj$48[varInitAssignLhsComputedProp$48] = 3;
varInitAssignLhsComputedObj$46[varInitAssignLhsComputedProp$46] = 3;
varInitAssignLhsComputedObj$44[varInitAssignLhsComputedProp$44] = 3;
varInitAssignLhsComputedObj$42[varInitAssignLhsComputedProp$42] = 3;
varInitAssignLhsComputedObj$40[varInitAssignLhsComputedProp$40] = 3;
varInitAssignLhsComputedObj$38[varInitAssignLhsComputedProp$38] = 3;
$(1);
const varInitAssignLhsComputedObj$47 = $(b);
const varInitAssignLhsComputedProp$47 = $(`x`);
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
varInitAssignLhsComputedObj$47[varInitAssignLhsComputedProp$47] = 3;
$(1);
const varInitAssignLhsComputedObj$50 = $(b);
const varInitAssignLhsComputedProp$50 = $(`x`);
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
varInitAssignLhsComputedObj$50[varInitAssignLhsComputedProp$50] = 3;
$(1);
const varInitAssignLhsComputedObj$59 = $(b);
const varInitAssignLhsComputedProp$59 = $(`x`);
const varInitAssignLhsComputedObj$61 = $(b);
const varInitAssignLhsComputedProp$61 = $(`x`);
const varInitAssignLhsComputedObj$63 = $(b);
const varInitAssignLhsComputedProp$63 = $(`x`);
const varInitAssignLhsComputedObj$65 = $(b);
const varInitAssignLhsComputedProp$65 = $(`x`);
const varInitAssignLhsComputedObj$67 = $(b);
const varInitAssignLhsComputedProp$67 = $(`x`);
const varInitAssignLhsComputedObj$69 = $(b);
const varInitAssignLhsComputedProp$69 = $(`x`);
varInitAssignLhsComputedObj$69[varInitAssignLhsComputedProp$69] = 3;
varInitAssignLhsComputedObj$67[varInitAssignLhsComputedProp$67] = 3;
varInitAssignLhsComputedObj$65[varInitAssignLhsComputedProp$65] = 3;
varInitAssignLhsComputedObj$63[varInitAssignLhsComputedProp$63] = 3;
varInitAssignLhsComputedObj$61[varInitAssignLhsComputedProp$61] = 3;
varInitAssignLhsComputedObj$59[varInitAssignLhsComputedProp$59] = 3;
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const varInitAssignLhsComputedObj$62 = $(b);
  const varInitAssignLhsComputedProp$62 = $(`x`);
  const varInitAssignLhsComputedObj$64 = $(b);
  const varInitAssignLhsComputedProp$64 = $(`x`);
  const varInitAssignLhsComputedObj$66 = $(b);
  const varInitAssignLhsComputedProp$66 = $(`x`);
  const varInitAssignLhsComputedObj$68 = $(b);
  const varInitAssignLhsComputedProp$68 = $(`x`);
  const varInitAssignLhsComputedObj$70 = $(b);
  const varInitAssignLhsComputedProp$70 = $(`x`);
  const varInitAssignLhsComputedObj$72 = $(b);
  const varInitAssignLhsComputedProp$72 = $(`x`);
  varInitAssignLhsComputedObj$72[varInitAssignLhsComputedProp$72] = 3;
  varInitAssignLhsComputedObj$70[varInitAssignLhsComputedProp$70] = 3;
  varInitAssignLhsComputedObj$68[varInitAssignLhsComputedProp$68] = 3;
  varInitAssignLhsComputedObj$66[varInitAssignLhsComputedProp$66] = 3;
  varInitAssignLhsComputedObj$64[varInitAssignLhsComputedProp$64] = 3;
  varInitAssignLhsComputedObj$62[varInitAssignLhsComputedProp$62] = 3;
  $(1);
}
$(a, b, 3);
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
 - 13: 1
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
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

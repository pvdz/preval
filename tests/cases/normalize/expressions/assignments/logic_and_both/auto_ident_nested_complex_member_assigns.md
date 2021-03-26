# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c) &&
    (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c)
);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$(
  (a = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = c) &&
    (a = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = c),
);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedObj$1 = $(b);
const varInitAssignLhsComputedProp$1 = $('x');
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $('x');
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $('x');
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $('x');
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const varInitAssignLhsComputedObj$9 = $(b);
  const varInitAssignLhsComputedProp$9 = $('x');
  const varInitAssignLhsComputedObj$11 = $(b);
  const varInitAssignLhsComputedProp$11 = $('x');
  const varInitAssignLhsComputedObj$13 = $(b);
  const varInitAssignLhsComputedProp$13 = $('x');
  const varInitAssignLhsComputedObj$15 = $(b);
  const varInitAssignLhsComputedProp$15 = $('x');
  const varInitAssignLhsComputedObj$17 = $(b);
  const varInitAssignLhsComputedProp$17 = $('x');
  const varInitAssignLhsComputedObj$19 = $(b);
  const varInitAssignLhsComputedProp$19 = $('x');
  const varInitAssignLhsComputedRhs$19 = c;
  varInitAssignLhsComputedObj$19[varInitAssignLhsComputedProp$19] = varInitAssignLhsComputedRhs$19;
  const varInitAssignLhsComputedRhs$17 = varInitAssignLhsComputedRhs$19;
  varInitAssignLhsComputedObj$17[varInitAssignLhsComputedProp$17] = varInitAssignLhsComputedRhs$17;
  const varInitAssignLhsComputedRhs$15 = varInitAssignLhsComputedRhs$17;
  varInitAssignLhsComputedObj$15[varInitAssignLhsComputedProp$15] = varInitAssignLhsComputedRhs$15;
  const varInitAssignLhsComputedRhs$13 = varInitAssignLhsComputedRhs$15;
  varInitAssignLhsComputedObj$13[varInitAssignLhsComputedProp$13] = varInitAssignLhsComputedRhs$13;
  const varInitAssignLhsComputedRhs$11 = varInitAssignLhsComputedRhs$13;
  varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = varInitAssignLhsComputedRhs$11;
  const varInitAssignLhsComputedRhs$9 = varInitAssignLhsComputedRhs$11;
  varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = varInitAssignLhsComputedRhs$9;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs$9;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedObj$1 = $(b);
const varInitAssignLhsComputedProp$1 = $('x');
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $('x');
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $('x');
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $('x');
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
let SSA_a = 3;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const varInitAssignLhsComputedObj$9 = $(b);
  const varInitAssignLhsComputedProp$9 = $('x');
  const varInitAssignLhsComputedObj$11 = $(b);
  const varInitAssignLhsComputedProp$11 = $('x');
  const varInitAssignLhsComputedObj$13 = $(b);
  const varInitAssignLhsComputedProp$13 = $('x');
  const varInitAssignLhsComputedObj$15 = $(b);
  const varInitAssignLhsComputedProp$15 = $('x');
  const varInitAssignLhsComputedObj$17 = $(b);
  const varInitAssignLhsComputedProp$17 = $('x');
  const varInitAssignLhsComputedObj$19 = $(b);
  const varInitAssignLhsComputedProp$19 = $('x');
  varInitAssignLhsComputedObj$19[varInitAssignLhsComputedProp$19] = 3;
  varInitAssignLhsComputedObj$17[varInitAssignLhsComputedProp$17] = 3;
  varInitAssignLhsComputedObj$15[varInitAssignLhsComputedProp$15] = 3;
  varInitAssignLhsComputedObj$13[varInitAssignLhsComputedProp$13] = 3;
  varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = 3;
  varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
  SSA_a = 3;
  tmpCalleeParam = 3;
}
$(tmpCalleeParam);
$(SSA_a, b, 3);
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
 - 13: { x: '3' }
 - 14: 'x'
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
 - 25: 3
 - 26: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

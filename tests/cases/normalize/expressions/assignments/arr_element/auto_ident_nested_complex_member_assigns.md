# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > assignments > arr_element > auto_ident_nested_complex_member_assigns
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
  ] = $(b)[$("x")] = c) +
    (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c)
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
const varInitAssignLhsComputedObj$2 = $(b);
const varInitAssignLhsComputedProp$2 = $('x');
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $('x');
const varInitAssignLhsComputedObj$4 = $(b);
const varInitAssignLhsComputedProp$4 = $('x');
const varInitAssignLhsComputedRhs$4 = c;
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$4;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpBinBothLhs = a;
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $('x');
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $('x');
const varInitAssignLhsComputedObj$6 = $(b);
const varInitAssignLhsComputedProp$6 = $('x');
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $('x');
const varInitAssignLhsComputedObj$8 = $(b);
const varInitAssignLhsComputedProp$8 = $('x');
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $('x');
const varInitAssignLhsComputedRhs$9 = c;
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = varInitAssignLhsComputedRhs$9;
const varInitAssignLhsComputedRhs$8 = varInitAssignLhsComputedRhs$9;
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = varInitAssignLhsComputedRhs$8;
const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$8;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$6 = varInitAssignLhsComputedRhs$7;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = varInitAssignLhsComputedRhs$6;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$6;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
const tmpNestedAssignPropRhs$1 = varInitAssignLhsComputedRhs$5;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedObj$1 = $(b);
const varInitAssignLhsComputedProp$1 = $('x');
const varInitAssignLhsComputedObj$2 = $(b);
const varInitAssignLhsComputedProp$2 = $('x');
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $('x');
const varInitAssignLhsComputedObj$4 = $(b);
const varInitAssignLhsComputedProp$4 = $('x');
const varInitAssignLhsComputedRhs$4 = c;
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$4;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$4;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$4;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$4;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$4;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs$4;
a = varInitAssignLhsComputedRhs$4;
let tmpBinBothLhs = a;
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $('x');
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $('x');
const varInitAssignLhsComputedObj$6 = $(b);
const varInitAssignLhsComputedProp$6 = $('x');
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $('x');
const varInitAssignLhsComputedObj$8 = $(b);
const varInitAssignLhsComputedProp$8 = $('x');
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $('x');
const varInitAssignLhsComputedRhs$9 = c;
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = varInitAssignLhsComputedRhs$9;
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = varInitAssignLhsComputedRhs$9;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$9;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = varInitAssignLhsComputedRhs$9;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$9;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = varInitAssignLhsComputedRhs$9;
a = varInitAssignLhsComputedRhs$9;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b, c);
`````

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
 - 25: 6
 - 26: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

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
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $('x');
let tmpNestedAssignPropRhs$1;
const tmpNestedAssignComMemberObj$2 = $(b);
const tmpNestedAssignComMemberProp$2 = $('x');
let tmpNestedAssignPropRhs$2;
const tmpNestedAssignComMemberObj$3 = $(b);
const tmpNestedAssignComMemberProp$3 = $('x');
let tmpNestedAssignPropRhs$3;
const tmpNestedAssignComMemberObj$4 = $(b);
const tmpNestedAssignComMemberProp$4 = $('x');
let tmpNestedAssignPropRhs$4;
const tmpNestedAssignComMemberObj$5 = $(b);
const tmpNestedAssignComMemberProp$5 = $('x');
const tmpNestedPropAssignRhs = c;
tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$4;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$5;
tmpNestedComplexRhs = tmpNestedPropAssignRhs$5;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
const tmpNestedAssignComMemberObj$6 = $(b);
const tmpNestedAssignComMemberProp$6 = $('x');
let tmpNestedAssignPropRhs$5;
const tmpNestedAssignComMemberObj$7 = $(b);
const tmpNestedAssignComMemberProp$7 = $('x');
let tmpNestedAssignPropRhs$6;
const tmpNestedAssignComMemberObj$8 = $(b);
const tmpNestedAssignComMemberProp$8 = $('x');
let tmpNestedAssignPropRhs$7;
const tmpNestedAssignComMemberObj$9 = $(b);
const tmpNestedAssignComMemberProp$9 = $('x');
let tmpNestedAssignPropRhs$8;
const tmpNestedAssignComMemberObj$10 = $(b);
const tmpNestedAssignComMemberProp$10 = $('x');
let tmpNestedAssignPropRhs$9;
const tmpNestedAssignComMemberObj$11 = $(b);
const tmpNestedAssignComMemberProp$11 = $('x');
const tmpNestedPropAssignRhs$6 = c;
tmpNestedAssignComMemberObj$11[tmpNestedAssignComMemberProp$11] = tmpNestedPropAssignRhs$6;
tmpNestedAssignPropRhs$9 = tmpNestedPropAssignRhs$6;
const tmpNestedPropAssignRhs$7 = tmpNestedAssignPropRhs$9;
tmpNestedAssignComMemberObj$10[tmpNestedAssignComMemberProp$10] = tmpNestedPropAssignRhs$7;
tmpNestedAssignPropRhs$8 = tmpNestedPropAssignRhs$7;
const tmpNestedPropAssignRhs$8 = tmpNestedAssignPropRhs$8;
tmpNestedAssignComMemberObj$9[tmpNestedAssignComMemberProp$9] = tmpNestedPropAssignRhs$8;
tmpNestedAssignPropRhs$7 = tmpNestedPropAssignRhs$8;
const tmpNestedPropAssignRhs$9 = tmpNestedAssignPropRhs$7;
tmpNestedAssignComMemberObj$8[tmpNestedAssignComMemberProp$8] = tmpNestedPropAssignRhs$9;
tmpNestedAssignPropRhs$6 = tmpNestedPropAssignRhs$9;
const tmpNestedPropAssignRhs$10 = tmpNestedAssignPropRhs$6;
tmpNestedAssignComMemberObj$7[tmpNestedAssignComMemberProp$7] = tmpNestedPropAssignRhs$10;
tmpNestedAssignPropRhs$5 = tmpNestedPropAssignRhs$10;
const tmpNestedPropAssignRhs$11 = tmpNestedAssignPropRhs$5;
tmpNestedAssignComMemberObj$6[tmpNestedAssignComMemberProp$6] = tmpNestedPropAssignRhs$11;
tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$11;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $('x');
let tmpNestedAssignPropRhs$1;
const tmpNestedAssignComMemberObj$2 = $(b);
const tmpNestedAssignComMemberProp$2 = $('x');
let tmpNestedAssignPropRhs$2;
const tmpNestedAssignComMemberObj$3 = $(b);
const tmpNestedAssignComMemberProp$3 = $('x');
let tmpNestedAssignPropRhs$3;
const tmpNestedAssignComMemberObj$4 = $(b);
const tmpNestedAssignComMemberProp$4 = $('x');
let tmpNestedAssignPropRhs$4;
const tmpNestedAssignComMemberObj$5 = $(b);
const tmpNestedAssignComMemberProp$5 = $('x');
const tmpNestedPropAssignRhs = c;
tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$4;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$5;
tmpNestedComplexRhs = tmpNestedPropAssignRhs$5;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
const tmpNestedAssignComMemberObj$6 = $(b);
const tmpNestedAssignComMemberProp$6 = $('x');
let tmpNestedAssignPropRhs$5;
const tmpNestedAssignComMemberObj$7 = $(b);
const tmpNestedAssignComMemberProp$7 = $('x');
let tmpNestedAssignPropRhs$6;
const tmpNestedAssignComMemberObj$8 = $(b);
const tmpNestedAssignComMemberProp$8 = $('x');
let tmpNestedAssignPropRhs$7;
const tmpNestedAssignComMemberObj$9 = $(b);
const tmpNestedAssignComMemberProp$9 = $('x');
let tmpNestedAssignPropRhs$8;
const tmpNestedAssignComMemberObj$10 = $(b);
const tmpNestedAssignComMemberProp$10 = $('x');
let tmpNestedAssignPropRhs$9;
const tmpNestedAssignComMemberObj$11 = $(b);
const tmpNestedAssignComMemberProp$11 = $('x');
const tmpNestedPropAssignRhs$6 = c;
tmpNestedAssignComMemberObj$11[tmpNestedAssignComMemberProp$11] = tmpNestedPropAssignRhs$6;
tmpNestedAssignPropRhs$9 = tmpNestedPropAssignRhs$6;
const tmpNestedPropAssignRhs$7 = tmpNestedAssignPropRhs$9;
tmpNestedAssignComMemberObj$10[tmpNestedAssignComMemberProp$10] = tmpNestedPropAssignRhs$7;
tmpNestedAssignPropRhs$8 = tmpNestedPropAssignRhs$7;
const tmpNestedPropAssignRhs$8 = tmpNestedAssignPropRhs$8;
tmpNestedAssignComMemberObj$9[tmpNestedAssignComMemberProp$9] = tmpNestedPropAssignRhs$8;
tmpNestedAssignPropRhs$7 = tmpNestedPropAssignRhs$8;
const tmpNestedPropAssignRhs$9 = tmpNestedAssignPropRhs$7;
tmpNestedAssignComMemberObj$8[tmpNestedAssignComMemberProp$8] = tmpNestedPropAssignRhs$9;
tmpNestedAssignPropRhs$6 = tmpNestedPropAssignRhs$9;
const tmpNestedPropAssignRhs$10 = tmpNestedAssignPropRhs$6;
tmpNestedAssignComMemberObj$7[tmpNestedAssignComMemberProp$7] = tmpNestedPropAssignRhs$10;
tmpNestedAssignPropRhs$5 = tmpNestedPropAssignRhs$10;
const tmpNestedPropAssignRhs$11 = tmpNestedAssignPropRhs$5;
tmpNestedAssignComMemberObj$6[tmpNestedAssignComMemberProp$6] = tmpNestedPropAssignRhs$11;
tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$11;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
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

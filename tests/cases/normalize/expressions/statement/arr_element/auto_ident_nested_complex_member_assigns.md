# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Arr element > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
  b
)[$("x")] = c) +
  ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
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
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $('x');
const varInitAssignLhsComputedRhs$5 = c;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$4 = varInitAssignLhsComputedRhs$5;
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$4;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpBinBothLhs = varInitAssignLhsComputedRhs;
const varInitAssignLhsComputedObj$6 = $(b);
const varInitAssignLhsComputedProp$6 = $('x');
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $('x');
const varInitAssignLhsComputedObj$8 = $(b);
const varInitAssignLhsComputedProp$8 = $('x');
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $('x');
const varInitAssignLhsComputedObj$10 = $(b);
const varInitAssignLhsComputedProp$10 = $('x');
const varInitAssignLhsComputedObj$11 = $(b);
const varInitAssignLhsComputedProp$11 = $('x');
const varInitAssignLhsComputedRhs$11 = c;
varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = varInitAssignLhsComputedRhs$11;
const varInitAssignLhsComputedRhs$10 = varInitAssignLhsComputedRhs$11;
varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = varInitAssignLhsComputedRhs$10;
const varInitAssignLhsComputedRhs$9 = varInitAssignLhsComputedRhs$10;
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = varInitAssignLhsComputedRhs$9;
const varInitAssignLhsComputedRhs$8 = varInitAssignLhsComputedRhs$9;
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = varInitAssignLhsComputedRhs$8;
const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$8;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$6 = varInitAssignLhsComputedRhs$7;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = varInitAssignLhsComputedRhs$6;
const tmpBinBothRhs = varInitAssignLhsComputedRhs$6;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
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
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $('x');
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
const varInitAssignLhsComputedObj$6 = $(b);
const varInitAssignLhsComputedProp$6 = $('x');
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $('x');
const varInitAssignLhsComputedObj$8 = $(b);
const varInitAssignLhsComputedProp$8 = $('x');
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $('x');
const varInitAssignLhsComputedObj$10 = $(b);
const varInitAssignLhsComputedProp$10 = $('x');
const varInitAssignLhsComputedObj$11 = $(b);
const varInitAssignLhsComputedProp$11 = $('x');
varInitAssignLhsComputedObj$11[varInitAssignLhsComputedProp$11] = 3;
varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
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
 - 25: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

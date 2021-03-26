# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Call spread > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  ...($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
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
$(...($(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
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
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $('x');
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
const tmpCalleeParamSpread = varInitAssignLhsComputedRhs;
tmpCallCallee(...tmpCalleeParamSpread);
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
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $('x');
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $('x');
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $('x');
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $('x');
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
$(...3);
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
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  $(100) ||
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
$($(100) || (a = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
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
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
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
  a = 3;
  tmpCalleeParam = 3;
}
$(tmpCalleeParam);
$(a, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { x: '1' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

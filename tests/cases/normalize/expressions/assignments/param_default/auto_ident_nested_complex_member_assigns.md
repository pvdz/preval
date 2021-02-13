# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > assignments > param_default > auto_ident_nested_complex_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
function f(
  p = (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c)
) {}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
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
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
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
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
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
 - 13: undefined
 - 14: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
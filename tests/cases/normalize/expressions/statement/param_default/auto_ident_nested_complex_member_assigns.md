# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Param default > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
function f(
  p = ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
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
    p = tmpNestedPropAssignRhs;
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
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
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
    varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
    varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  }
}
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
 - 13: undefined
 - 14: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

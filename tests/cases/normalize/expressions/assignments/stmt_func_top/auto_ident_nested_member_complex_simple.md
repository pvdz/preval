# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 },
    c = { y: 2 },
    d = 3;

  let a = { a: 999, b: 1000 };
  a = $(b)[$("x")] = $(c)[$("y")] = d;
  $(a, b, c, d);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 },
    c = { y: 2 },
    d = 3;
  let a = { a: 999, b: 1000 };
  a = $(b)[$(`x`)] = $(c)[$(`y`)] = d;
  $(a, b, c, d);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let c = { y: 2 };
  let d = 3;
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = d;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b, c, d);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(3, b, c, 3);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3, { x: '3' }, { y: '3' }, 3
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

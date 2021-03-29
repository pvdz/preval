# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident nested member complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = { y: 2 },
      d = 3;

    let a = ($(b)[$("x")] = $(c)[$("y")] = d);
    $(a, b, c, d);
}
`````

## Pre Normal

`````js filename=intro
{
  let b;
  let c;
  let d;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      (b = { x: 1 }), (c = { y: 2 }), (d = 3);
      a = $(b)[$('x')] = $(c)[$('y')] = d;
      $(a, b, c, d);
    }
  }
}
`````

## Normalized

`````js filename=intro
let b = undefined;
let c = undefined;
let d = undefined;
let a = undefined;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { x: 1 };
  c = { y: 2 };
  d = 3;
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $('y');
  const varInitAssignLhsComputedRhs = d;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b, c, d);
}
`````

## Output

`````js filename=intro
const tmpSSA_b = { x: 1 };
const tmpSSA_c = { y: 2 };
const tmpNestedAssignComMemberObj = $(tmpSSA_b);
const tmpNestedAssignComMemberProp = $('x');
const varInitAssignLhsComputedObj = $(tmpSSA_c);
const varInitAssignLhsComputedProp = $('y');
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(3, tmpSSA_b, tmpSSA_c, 3);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

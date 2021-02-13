# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > assignments > switch_case_block > auto_ident_nested_complex_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c;
  }
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
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
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
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
    }
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
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
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
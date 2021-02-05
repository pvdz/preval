# Preval test case

# auto_ident_nested_member_complex_call.md

> normalize > expressions > assignments > switch_case_block > auto_ident_nested_member_complex_call
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $(b)[$("x")] = $(c)[$("y")] = $(d);
  }
}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      {
        const tmpNestedAssignComMemberObj = $(b);
        const tmpNestedAssignComMemberProp = $('x');
        let tmpNestedAssignPropRhs;
        const tmpNestedAssignComMemberObj$1 = $(c);
        const tmpNestedAssignComMemberProp$1 = $('y');
        let tmpNestedAssignPropRhs$1 = $(d);
        const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
        tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
        tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
        const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
        tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
        a = tmpNestedPropAssignRhs$1;
      }
    }
    tmpFallthrough = true;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  const tmpBinBothRhs = $(1);
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignComMemberObj$1 = $(c);
  const tmpNestedAssignComMemberProp$1 = $('y');
  let tmpNestedAssignPropRhs$1 = $(3);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
  a = tmpNestedPropAssignRhs$1;
  tmpFallthrough = true;
}
$(a, b, c, 3);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: 3
 - 8: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

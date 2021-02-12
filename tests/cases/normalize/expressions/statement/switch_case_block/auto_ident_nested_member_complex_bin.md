# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > statement > switch_case_block > auto_ident_nested_member_complex_bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    $(b)[$("x")] = $(c)[$("y")] = d + e;
  }
}
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
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
      const tmpAssignComMemLhsObj = $(b);
      const tmpAssignComMemLhsProp = $('x');
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      let tmpAssignComputedRhs;
      const tmpNestedAssignComMemberObj = $(c);
      const tmpNestedAssignComMemberProp = $('y');
      let tmpNestedAssignPropRhs = d + e;
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
      tmpAssignComputedRhs = tmpNestedPropAssignRhs;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
  }
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

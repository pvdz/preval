# Preval test case

# auto_ident_nested_member_complex_simple.md

> normalize > expressions > statement > switch_default > auto_ident_nested_member_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $(b)[$("x")] = $(c)[$("y")] = d;
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
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $('x');
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    let tmpAssignComputedRhs;
    const tmpNestedAssignComMemberObj = $(c);
    const tmpNestedAssignComMemberProp = $('y');
    const tmpNestedPropAssignRhs = d;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    tmpAssignComputedRhs = tmpNestedPropAssignRhs;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

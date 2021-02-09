# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > statement > switch_default > auto_ident_nested_complex_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c;
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $('x');
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    let tmpAssignComputedRhs;
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $('x');
    let tmpNestedAssignPropRhs;
    const tmpNestedAssignComMemberObj$1 = $(b);
    const tmpNestedAssignComMemberProp$1 = $('x');
    let tmpNestedAssignPropRhs$1;
    const tmpNestedAssignComMemberObj$2 = $(b);
    const tmpNestedAssignComMemberProp$2 = $('x');
    let tmpNestedAssignPropRhs$2;
    const tmpNestedAssignComMemberObj$3 = $(b);
    const tmpNestedAssignComMemberProp$3 = $('x');
    let tmpNestedAssignPropRhs$3;
    const tmpNestedAssignComMemberObj$4 = $(b);
    const tmpNestedAssignComMemberProp$4 = $('x');
    const tmpNestedPropAssignRhs = c;
    tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$3;
    tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$1;
    tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$1;
    const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$2;
    tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$2;
    tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$2;
    const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$3;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$3;
    const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$4;
    tmpAssignComputedRhs = tmpNestedPropAssignRhs$4;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $('x');
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    let tmpAssignComputedRhs;
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $('x');
    let tmpNestedAssignPropRhs;
    const tmpNestedAssignComMemberObj$1 = $(b);
    const tmpNestedAssignComMemberProp$1 = $('x');
    let tmpNestedAssignPropRhs$1;
    const tmpNestedAssignComMemberObj$2 = $(b);
    const tmpNestedAssignComMemberProp$2 = $('x');
    let tmpNestedAssignPropRhs$2;
    const tmpNestedAssignComMemberObj$3 = $(b);
    const tmpNestedAssignComMemberProp$3 = $('x');
    let tmpNestedAssignPropRhs$3;
    const tmpNestedAssignComMemberObj$4 = $(b);
    const tmpNestedAssignComMemberProp$4 = $('x');
    const tmpNestedPropAssignRhs = c;
    tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$3;
    tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$1;
    tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$1;
    const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$2;
    tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$2;
    tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$2;
    const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$3;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$3;
    const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$4;
    tmpAssignComputedRhs = tmpNestedPropAssignRhs$4;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - 14: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

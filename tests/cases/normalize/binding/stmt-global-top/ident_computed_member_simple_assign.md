# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > stmt > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = b[$('x')] = $(c)[$('y')] = $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
let a;
const tmpNestedAssignComMemberObj = b;
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
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
let a;
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $('x');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = $(3);
const tmpNestedAssignComMemberProp$1 = $('y');
let tmpNestedAssignPropRhs$1 = $(4);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 3
 - 3: 'y'
 - 4: 4
 - 5: 4, { x: '4' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

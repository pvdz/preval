# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > stmt > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = b[$('x')] = c + d;
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
const tmpNestedAssignPropRhs = c + d;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
let a;
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $('x');
const tmpNestedAssignPropRhs = c + d;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 7, { x: '7' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > stmt > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
let a = $(b)[$('x')] = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
let a;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
const tmpNestedPropAssignRhs = c;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
let a;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
a = 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

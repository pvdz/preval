# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > export-default > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = $(b)[$('x')] = c;
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
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > let > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let wat = a = b[$('x')] = c;
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = c;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let wat = a;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let wat = a;
$(wat);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: 3,{"x":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same

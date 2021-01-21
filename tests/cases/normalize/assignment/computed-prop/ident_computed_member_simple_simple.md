# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > computed-prop > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let obj = {};
obj[a = b[$('x')] = c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let obj = {};
tmpAssignComMemLhsObj = obj;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = c;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpAssignComMemLhsProp = tmpNestedComplexRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let obj = {};
tmpAssignComMemLhsObj = obj;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpAssignComMemLhsProp = tmpNestedComplexRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3,{"x":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same

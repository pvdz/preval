# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= $(b)[$('x')] += $(c)[$('y')] -= $(d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignCompMemberObj = $(b);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberObj_1 = $(c);
tmpNestedAssignCompMemberProp_1 = $('y');
tmpNestedAssignCompMemberRhs_1 = $(d);
tmpAssignMemLhsObj = tmpNestedAssignCompMemberObj_1;
tmpBinaryLeft = tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1];
tmpAssignMemRhs = tmpBinaryLeft - tmpNestedAssignCompMemberRhs_1;
tmpAssignMemLhsObj[tmpNestedAssignCompMemberProp_1] = tmpAssignMemRhs;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpAssignMemLhsObj_1 = tmpNestedAssignCompMemberObj;
tmpBinaryLeft_1 = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
tmpAssignMemRhs_1 = tmpBinaryLeft_1 + tmpNestedAssignCompMemberRhs;
tmpAssignMemLhsObj_1[tmpNestedAssignCompMemberProp] = tmpAssignMemRhs_1;
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignCompMemberObj = $(b);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberObj_1 = $(3);
tmpNestedAssignCompMemberProp_1 = $('y');
tmpNestedAssignCompMemberRhs_1 = $(4);
tmpAssignMemLhsObj = tmpNestedAssignCompMemberObj_1;
tmpBinaryLeft = tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1];
tmpAssignMemRhs = tmpBinaryLeft - tmpNestedAssignCompMemberRhs_1;
tmpAssignMemLhsObj[tmpNestedAssignCompMemberProp_1] = tmpAssignMemRhs;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpAssignMemLhsObj_1 = tmpNestedAssignCompMemberObj;
tmpBinaryLeft_1 = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
tmpAssignMemRhs_1 = tmpBinaryLeft_1 + tmpNestedAssignCompMemberRhs;
tmpAssignMemLhsObj_1[tmpNestedAssignCompMemberProp] = tmpAssignMemRhs_1;
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
[[{ x: 2 }], ['x'], "<crash[ Cannot read property 'undefined' of undefined ]>"];

Normalized calls: BAD?!
[[{ x: 2 }], ['x'], [3], ['y'], [4], "<crash[ Cannot read property 'undefined' of undefined ]>"];

Final output calls: BAD!!
[[{ x: 2 }], ['x'], [3], ['y'], [4], "<crash[ Cannot read property 'undefined' of undefined ]>"];


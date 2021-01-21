# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > arr-spread > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$([...(a = $(b)[$('x')] = $(c)[$('y')] = $(d))]);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj_1 = $(c);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('y');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = $(d);
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj_1 = $(3);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $('y');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = $(4);
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same

# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > tagged > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$`abc ${a = b[$('x')] = $(c)[$('y')] = $(d)} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpArg = ['abc ', ' def'];
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj = $(c);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj;
tmpNestedAssignComMemberProp_1 = $('y');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = $(d);
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj = $(3);
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj;
tmpNestedAssignComMemberProp_1 = $('y');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignCompMemberRhs_1 = $(4);
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: ["abc "," def"],4
 - 5: 4,{"x":4},3
 - 6: undefined

Normalized calls: Same

Final output calls: Same

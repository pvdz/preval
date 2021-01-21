# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > binary-both > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = b[$('x')] = c) + (a = b[$('x')] = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = c;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignComMemberObj_1 = b;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedPropAssignRhs_1 = c;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
tmpNestedComplexRhs_1 = tmpNestedPropAssignRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignComMemberObj_1 = b;
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedPropAssignRhs_1 = 3;
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
tmpNestedComplexRhs_1 = tmpNestedPropAssignRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "x"
 - 2: 6
 - 3: 3,{"x":3},3
 - 4: undefined

Normalized calls: Same

Final output calls: Same

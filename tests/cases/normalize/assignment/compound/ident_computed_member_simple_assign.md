# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > stmt > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= b[$('x')] -= $(c)[$('y')] = $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpNestedAssignObj = $(c);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
tmpNestedAssignComMemberProp$1 = $('y');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp$1;
tmpNestedAssignCompMemberRhs = $(d);
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryRight = tmpNestedAssignCompMemberRhs;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft - tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpNestedAssignObj = $(3);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
tmpNestedAssignComMemberProp$1 = $('y');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp$1;
tmpNestedAssignCompMemberRhs = $(4);
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryRight = tmpNestedAssignCompMemberRhs;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft - tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: -2,{"x":-2},3
 - 5: undefined

Normalized calls: Same

Final output calls: Same

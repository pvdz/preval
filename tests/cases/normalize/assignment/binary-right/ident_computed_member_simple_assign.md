# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > binary-right > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$(500 + (a = b[$('x')] = $(c)[$('y')] = $(d)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj = $(c);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
tmpNestedAssignComMemberProp$1 = $('y');
tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
tmpNestedAssignCompMemberRhs$1 = $(d);
tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj = $(3);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
tmpNestedAssignComMemberProp$1 = $('y');
tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
tmpNestedAssignCompMemberRhs$1 = $(4);
tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: 504
 - 5: 4,{"x":4},3
 - 6: undefined

Normalized calls: Same

Final output calls: Same

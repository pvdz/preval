# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > binary-both > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = b[$('x')] = $(c)[$('y')] = $(d)) + (a = b[$('x')] = $(c)[$('y')] = $(d)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberObj$2;
var tmpNestedAssignComMemberObj$3;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignComMemberProp$2;
var tmpNestedAssignComMemberProp$3;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberObj$2;
var tmpNestedAssignCompMemberObj$3;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberProp$2;
var tmpNestedAssignCompMemberProp$3;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignCompMemberRhs$2;
var tmpNestedAssignCompMemberRhs$3;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
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
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignComMemberObj$2 = b;
tmpNestedAssignComMemberProp$2 = $('x');
tmpNestedAssignCompMemberObj$2 = tmpNestedAssignComMemberObj$2;
tmpNestedAssignCompMemberProp$2 = tmpNestedAssignComMemberProp$2;
tmpNestedAssignObj$1 = $(c);
tmpNestedAssignComMemberObj$3 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$3 = $('y');
tmpNestedAssignCompMemberObj$3 = tmpNestedAssignComMemberObj$3;
tmpNestedAssignCompMemberProp$3 = tmpNestedAssignComMemberProp$3;
tmpNestedAssignCompMemberRhs$3 = $(d);
tmpNestedAssignCompMemberObj$3[tmpNestedAssignCompMemberProp$3] = tmpNestedAssignCompMemberRhs$3;
tmpNestedAssignCompMemberRhs$2 = tmpNestedAssignCompMemberRhs$3;
tmpNestedAssignCompMemberObj$2[tmpNestedAssignCompMemberProp$2] = tmpNestedAssignCompMemberRhs$2;
tmpNestedComplexRhs$1 = tmpNestedAssignCompMemberRhs$2;
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberObj$2;
var tmpNestedAssignComMemberObj$3;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignComMemberProp$2;
var tmpNestedAssignComMemberProp$3;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberObj$2;
var tmpNestedAssignCompMemberObj$3;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberProp$2;
var tmpNestedAssignCompMemberProp$3;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignCompMemberRhs$2;
var tmpNestedAssignCompMemberRhs$3;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
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
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignComMemberObj$2 = b;
tmpNestedAssignComMemberProp$2 = $('x');
tmpNestedAssignCompMemberObj$2 = tmpNestedAssignComMemberObj$2;
tmpNestedAssignCompMemberProp$2 = tmpNestedAssignComMemberProp$2;
tmpNestedAssignObj$1 = $(3);
tmpNestedAssignComMemberObj$3 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$3 = $('y');
tmpNestedAssignCompMemberObj$3 = tmpNestedAssignComMemberObj$3;
tmpNestedAssignCompMemberProp$3 = tmpNestedAssignComMemberProp$3;
tmpNestedAssignCompMemberRhs$3 = $(4);
tmpNestedAssignCompMemberObj$3[tmpNestedAssignCompMemberProp$3] = tmpNestedAssignCompMemberRhs$3;
tmpNestedAssignCompMemberRhs$2 = tmpNestedAssignCompMemberRhs$3;
tmpNestedAssignCompMemberObj$2[tmpNestedAssignCompMemberProp$2] = tmpNestedAssignCompMemberRhs$2;
tmpNestedComplexRhs$1 = tmpNestedAssignCompMemberRhs$2;
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: "x"
 - 5: 3
 - 6: "y"
 - 7: 4
 - 8: 8
 - 9: 4,{"x":4},3
 - 10: undefined

Normalized calls: Same

Final output calls: Same

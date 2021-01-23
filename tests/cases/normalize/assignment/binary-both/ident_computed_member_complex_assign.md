# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > binary-both > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b)[$('x')] = $(c)[$('y')] = $(d)) + (a = $(b)[$('x')] = $(c)[$('y')] = $(d)));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedComplexRhs$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignComMemberObj$2;
var tmpNestedAssignComMemberProp$2;
var tmpNestedAssignCompMemberObj$2;
var tmpNestedAssignCompMemberProp$2;
var tmpNestedAssignCompMemberRhs$2;
var tmpNestedAssignObj$3;
var tmpNestedAssignComMemberObj$3;
var tmpNestedAssignComMemberProp$3;
var tmpNestedAssignCompMemberObj$3;
var tmpNestedAssignCompMemberProp$3;
var tmpNestedAssignCompMemberRhs$3;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj$1 = $(c);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
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
tmpNestedAssignObj$2 = $(b);
tmpNestedAssignComMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignComMemberProp$2 = $('x');
tmpNestedAssignCompMemberObj$2 = tmpNestedAssignComMemberObj$2;
tmpNestedAssignCompMemberProp$2 = tmpNestedAssignComMemberProp$2;
tmpNestedAssignObj$3 = $(c);
tmpNestedAssignComMemberObj$3 = tmpNestedAssignObj$3;
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
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedComplexRhs$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignComMemberObj$2;
var tmpNestedAssignComMemberProp$2;
var tmpNestedAssignCompMemberObj$2;
var tmpNestedAssignCompMemberProp$2;
var tmpNestedAssignCompMemberRhs$2;
var tmpNestedAssignObj$3;
var tmpNestedAssignComMemberObj$3;
var tmpNestedAssignComMemberProp$3;
var tmpNestedAssignCompMemberObj$3;
var tmpNestedAssignCompMemberProp$3;
var tmpNestedAssignCompMemberRhs$3;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj$1 = $(3);
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
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
tmpNestedAssignObj$2 = $(b);
tmpNestedAssignComMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignComMemberProp$2 = $('x');
tmpNestedAssignCompMemberObj$2 = tmpNestedAssignComMemberObj$2;
tmpNestedAssignCompMemberProp$2 = tmpNestedAssignComMemberProp$2;
tmpNestedAssignObj$3 = $(3);
tmpNestedAssignComMemberObj$3 = tmpNestedAssignObj$3;
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
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: {"x":4}
 - 6: "x"
 - 7: 3
 - 8: "y"
 - 9: 4
 - 10: 8
 - 11: 4,{"x":4},3,4
 - 12: undefined

Normalized calls: Same

Final output calls: Same

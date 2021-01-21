# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > binary-right > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(500 + ($(500 + ($(a)[$('x')] = b))));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = b;
tmpBinaryRight_1 = b;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 2;
tmpBinaryRight_1 = 2;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: 502
 - 3: 1002
 - 4: {"x":2},2,3
 - 5: undefined

Normalized calls: Same

Final output calls: Same

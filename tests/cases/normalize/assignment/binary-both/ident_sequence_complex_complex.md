# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), $(c)).x = $(c)) + (a = ($(b), $(c)).x = $(c)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedComplexRhs$1;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedAssignObj = $(c);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = $(c);
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
$(b);
tmpNestedAssignObj$1 = $(c);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignMemberRhs$1 = $(c);
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs$1;
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
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedComplexRhs$1;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = $(3);
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
$(2);
tmpNestedAssignObj$1 = $(3);
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignMemberRhs$1 = $(3);
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 3
 - 3: 2
 - 4: 3
 - 5: 3
 - 6: 6
 - 7: 3,2,3
 - 8: undefined

Normalized calls: Same

Final output calls: Same

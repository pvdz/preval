# Preval test case

# member_complex_simple.md

> normalize > assignment > binary-both > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a).x = b) + ($(a).x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs$1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = b;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
tmpNestedAssignObj$1 = $(a);
tmpNestedPropAssignRhs$1 = b;
tmpNestedAssignObj$1.x = tmpNestedPropAssignRhs$1;
tmpBinaryRight = tmpNestedPropAssignRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs$1;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
tmpNestedAssignObj$1 = $(a);
tmpNestedPropAssignRhs$1 = 2;
tmpNestedAssignObj$1.x = tmpNestedPropAssignRhs$1;
tmpBinaryRight = tmpNestedPropAssignRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: {"x":2}
 - 2: 4
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same

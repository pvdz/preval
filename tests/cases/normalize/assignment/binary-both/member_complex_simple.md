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
var tmpNestedAssignObj_1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = b;
tmpBinaryLeft = b;
tmpNestedAssignObj_1 = $(a);
tmpNestedAssignObj_1.x = b;
tmpBinaryRight = b;
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
var tmpNestedAssignObj_1;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = 2;
tmpBinaryLeft = 2;
tmpNestedAssignObj_1 = $(a);
tmpNestedAssignObj_1.x = 2;
tmpBinaryRight = 2;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], "<crash[ Cannot set property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same

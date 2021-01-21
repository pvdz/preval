# Preval test case

# member_complex_simple.md

> normalize > assignment > binary-left > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a).x = b) + 500);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedAssignObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = b;
tmpBinaryLeft = b;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedAssignObj;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = 2;
tmpBinaryLeft = 2;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: 502
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same

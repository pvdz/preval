# Preval test case

# member_complex_simple.md

> normalize > assignment > obj-spread > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({...($(a).x = b)});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedAssignObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = b;
tmpObjSpreadArg = b;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedAssignObj;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = 2;
tmpObjSpreadArg = 2;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same

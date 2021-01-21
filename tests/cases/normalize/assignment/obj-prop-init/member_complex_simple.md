# Preval test case

# member_complex_simple.md

> normalize > assignment > obj-prop-init > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({foo: $(a).x = b});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = b;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpObjPropValue = tmpNestedPropAssignRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpObjPropValue = tmpNestedPropAssignRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: {"foo":2}
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same

# Preval test case

# member_complex_simple.md

> normalize > assignment > call > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(a).x = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = b;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: 2
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same

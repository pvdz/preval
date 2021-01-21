# Preval test case

# member_complex_simple.md

> normalize > assignment > computed-prop > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let obj = {};
obj[$(a).x = b] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
let obj = {};
tmpAssignComMemLhsObj = obj;
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = b;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpAssignComMemLhsProp = tmpNestedPropAssignRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let obj = {};
tmpAssignComMemLhsObj = obj;
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpAssignComMemLhsProp = tmpNestedPropAssignRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same

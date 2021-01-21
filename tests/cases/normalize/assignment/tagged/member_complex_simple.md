# Preval test case

# member_complex_simple.md

> normalize > assignment > tagged > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$`abc ${$(a).x = b} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = b;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpArg_1 = tmpNestedPropAssignRhs;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignObj = $(a);
tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpArg_1 = tmpNestedPropAssignRhs;
$(tmpArg, tmpArg_1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: ["abc "," def"],2
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same

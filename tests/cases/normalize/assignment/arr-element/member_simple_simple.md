# Preval test case

# member_simple_simple.md

> normalize > assignment > arr-element > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$([ a.x = b ]);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedPropAssignRhs = b;
a.x = tmpNestedPropAssignRhs;
tmpElement = tmpNestedPropAssignRhs;
tmpArg = [tmpElement];
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpNestedPropAssignRhs = 2;
a.x = tmpNestedPropAssignRhs;
tmpElement = tmpNestedPropAssignRhs;
tmpArg = [tmpElement];
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[[2]], [{ x: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same

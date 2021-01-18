# Preval test case

# member_simple_simple.md

> normalize > assignment > binary-both > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a.x = b) + (a.x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedPropAssignRhs;
var tmpNestedPropAssignRhs_1;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedPropAssignRhs = b;
a.x = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
tmpNestedPropAssignRhs_1 = b;
a.x = tmpNestedPropAssignRhs_1;
tmpBinaryRight = tmpNestedPropAssignRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedPropAssignRhs;
var tmpNestedPropAssignRhs_1;
let a = { x: 10 };
tmpNestedPropAssignRhs = 2;
a.x = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
tmpNestedPropAssignRhs_1 = 2;
a.x = tmpNestedPropAssignRhs_1;
tmpBinaryRight = tmpNestedPropAssignRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[4], [{ x: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same

# Preval test case

# member_simple_simple.md

> normalize > assignment > obj-prop-dyn > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({[(a.x = b)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedPropAssignRhs = b;
a.x = tmpNestedPropAssignRhs;
tmpComputedKey = tmpNestedPropAssignRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpNestedPropAssignRhs = 2;
a.x = tmpNestedPropAssignRhs;
tmpComputedKey = tmpNestedPropAssignRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"2":1000}
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same

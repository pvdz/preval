# Preval test case

# member_simple_simple.md

> normalize > assignment > tagged > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$`abc ${a.x = b} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedPropAssignRhs = b;
a.x = tmpNestedPropAssignRhs;
tmpArg$1 = tmpNestedPropAssignRhs;
$(tmpArg, tmpArg$1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpArg = ['abc ', ' def'];
tmpNestedPropAssignRhs = 2;
a.x = tmpNestedPropAssignRhs;
tmpArg$1 = tmpNestedPropAssignRhs;
$(tmpArg, tmpArg$1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: ["abc "," def"],2
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same

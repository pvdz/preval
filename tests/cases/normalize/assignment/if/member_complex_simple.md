# Preval test case

# member_complex_simple.md

> normalize > assignment > if > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
if ($(a).x = b) ;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.x = b;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.x = 2;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same

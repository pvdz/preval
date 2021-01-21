# Preval test case

# member_complex_simple.md

> normalize > assignment > let > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let wat = $(a).x = b;
$(wat);
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
let wat = b;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.x = 2;
$(2);
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

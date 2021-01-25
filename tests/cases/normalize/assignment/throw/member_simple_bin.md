# Preval test case

# member_simple_bin.md

> normalize > assignment > throw > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
throw a.x = b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = b + c;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
let tmpThrowArg = tmpAssignMemRhs;
throw tmpThrowArg;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
let a = { x: 10 };
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = 5;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
let tmpThrowArg = tmpAssignMemRhs;
throw tmpThrowArg;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ 5 ]>

Normalized calls: Same

Final output calls: Same

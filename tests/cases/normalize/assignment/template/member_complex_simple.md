# Preval test case

# member_complex_simple.md

> normalize > assignment > template > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${$(a).x = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = `abc ${(((tmpAssignMemLhsObj = $(a)), (tmpAssignMemRhs = b), tmpAssignMemLhsObj).x = tmpAssignMemRhs)} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
tmpArg = `abc ${(((tmpAssignMemLhsObj = $(a)), (tmpAssignMemRhs = 2), tmpAssignMemLhsObj).x = tmpAssignMemRhs)} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "abc 2 def"
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same

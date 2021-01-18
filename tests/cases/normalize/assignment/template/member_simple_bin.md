# Preval test case

# member_simple_bin.md

> normalize > assignment > template > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${a.x = b + c} def`)
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
tmpArg = `abc ${((tmpAssignMemLhsObj = a), (tmpAssignMemRhs = b + c), (tmpAssignMemLhsObj.x = tmpAssignMemRhs))} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
tmpArg = `abc ${((tmpAssignMemLhsObj = a), (tmpAssignMemRhs = 5), (tmpAssignMemLhsObj.x = tmpAssignMemRhs))} def`;
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
[['abc 5 def'], [{ x: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[['abc 5 def'], [{ x: 5 }, 5, 3], null];


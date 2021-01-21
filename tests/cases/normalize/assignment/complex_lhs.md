# Preval test case

# complex_lhs.md

> normalize > assignment > complex_lhs
>
> Lhs of assignment can have side effects too

#TODO

## Input

`````js filename=intro
$({}).foo = 10;
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
{
  tmpAssignMemLhsObj = $({});
  tmpAssignMemRhs = 10;
  tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
}
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
tmpAssignMemLhsObj = $({});
tmpAssignMemRhs = 10;
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 0: {"foo":10}
 - 1: undefined

Normalized calls: Same

Final output calls: Same

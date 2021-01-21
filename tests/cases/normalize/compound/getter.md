# Preval test case

# property.md

> normalize > compound > property
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

#TODO

## Input

`````js filename=intro
const obj = {
  x: 0
};
obj.x += 5;
$(obj.x); // 5
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpArg;
const obj = { x: 0 };
{
  tmpAssignMemLhsObj = obj;
  tmpBinaryLeft = obj.x;
  tmpAssignMemRhs = tmpBinaryLeft + 5;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
tmpArg = obj.x;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpArg;
const obj = { x: 0 };
tmpAssignMemLhsObj = obj;
tmpBinaryLeft = obj.x;
tmpAssignMemRhs = tmpBinaryLeft + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
tmpArg = obj.x;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 5
 - 1: undefined

Normalized calls: Same

Final output calls: Same

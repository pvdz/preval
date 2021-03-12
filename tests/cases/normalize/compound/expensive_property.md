# Preval test case

# expensive_property.md

> Normalize > Compound > Expensive property
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

#TODO

## Input

`````js filename=intro
function superExpensiveFunction() {
  // This will be inlined eventually (I hope) but the normalized code should take care not to call this function twice.
  return $();
}

// The normalized code should cache the value of the func call first before decomposing the compound assignment
superExpensiveFunction().x += 5;
`````

## Pre Normal

`````js filename=intro
let superExpensiveFunction = function () {
  return $();
};
superExpensiveFunction().x += 5;
`````

## Normalized

`````js filename=intro
let superExpensiveFunction = function () {
  const tmpReturnArg = $();
  return tmpReturnArg;
};
const tmpAssignMemLhsObj = superExpensiveFunction();
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
const tmpAssignMemLhsObj = $();
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

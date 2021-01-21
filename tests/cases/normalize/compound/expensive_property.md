# Preval test case

# property.md

> normalize > compound > property
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

## Normalized

`````js filename=intro
function superExpensiveFunction() {
  {
    let tmpStmtArg = $();
    return tmpStmtArg;
  }
}
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
tmpCompoundAssignObj = superExpensiveFunction();
tmpCompoundAssignRhs = 5;
{
  tmpAssignMemLhsObj = tmpCompoundAssignObj;
  tmpBinaryLeft = tmpCompoundAssignObj.x;
  tmpAssignMemRhs = tmpBinaryLeft + tmpCompoundAssignRhs;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
`````

## Output

`````js filename=intro
function superExpensiveFunction() {
  let tmpStmtArg = $();
  return tmpStmtArg;
}
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
tmpCompoundAssignObj = superExpensiveFunction();
tmpCompoundAssignRhs = 5;
tmpAssignMemLhsObj = tmpCompoundAssignObj;
tmpBinaryLeft = tmpCompoundAssignObj.x;
tmpAssignMemRhs = tmpBinaryLeft + tmpCompoundAssignRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 0: 
 - 1: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same

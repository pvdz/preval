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
  const tmpReturnArg = $();
  return tmpReturnArg;
}
const tmpAssignMemLhsObj = superExpensiveFunction();
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

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
    let tmpReturnArg = $();
    return tmpReturnArg;
  }
}
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpCompoundAssignLhs;
('<hoisted var `tmpAssignMemLhsObj` decl without init>');
('<hoisted var `tmpAssignMemLhsObj$1` decl without init>');
('<hoisted var `tmpAssignMemLhsObj$2` decl without init>');
('<hoisted var `tmpAssignMemRhs` decl without init>');
('<hoisted var `tmpCompoundAssignLhs` decl without init>');
tmpAssignMemLhsObj = superExpensiveFunction();
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
function superExpensiveFunction() {
  let tmpReturnArg = $();
  return tmpReturnArg;
}
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpCompoundAssignLhs;
tmpAssignMemLhsObj = superExpensiveFunction();
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 0: 
 - 1: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same

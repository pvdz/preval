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
  return $();
}
var tmpComplexMemberObj;
tmpComplexMemberObj = superExpensiveFunction();
tmpComplexMemberObj.x += 5;
`````

## Output

`````js filename=intro
function superExpensiveFunction() {
  return $();
}
var tmpComplexMemberObj;
tmpComplexMemberObj = superExpensiveFunction();
tmpComplexMemberObj.x += 5;
`````

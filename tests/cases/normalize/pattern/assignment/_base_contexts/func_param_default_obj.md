# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

#TODO: arrow

## Input

`````js filename=intro
const f = (a = { x } = 1) => { return a };
`````

## Normalized

`````js filename=intro
const f = ($tdz$__a) => {
  var objAssignPatternRhs;
  var x;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__a === undefined;
  let a = tmpTernaryTest ? ((objAssignPatternRhs = 1), (tmpTernaryConsequent = x = objAssignPatternRhs.x), tmpTernaryConsequent) : $tdz$__a;
  return a;
};
`````

## Output

`````js filename=intro

`````

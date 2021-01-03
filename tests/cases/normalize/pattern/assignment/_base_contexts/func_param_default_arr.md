# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

#TODO: arrow

## Input

`````js filename=intro
const f = (a = [ x ] = 1) => { return a };
`````

## Normalized

`````js filename=intro
const f = ($tdz$__a) => {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  var x;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__a === undefined;
  let a = tmpTernaryTest
    ? ((arrAssignPatternRhs = 1),
      (arrPatternSplat = [...arrAssignPatternRhs]),
      (tmpTernaryConsequent = x = arrPatternSplat[0]),
      tmpTernaryConsequent)
    : $tdz$__a;
  return a;
};
`````

## Output

`````js filename=intro

`````

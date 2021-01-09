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
      (x = arrPatternSplat[0]),
      (tmpTernaryConsequent = x),
      tmpTernaryConsequent)
    : $tdz$__a;
  return a;
};
`````

## Uniformed

`````js filename=intro
var x = (x) => {
  var x;
  var x;
  var x;
  var x;
  var x;
  x = x * x;
  var x = x ? ((x = 8), (x = [...x]), (x = x[8]), (x = x), x) : x;
  return x;
};
`````

## Output

`````js filename=intro
($tdz$__a) => {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  var x;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__a === undefined;
  let a = tmpTernaryTest
    ? ((arrAssignPatternRhs = 1),
      (arrPatternSplat = [...arrAssignPatternRhs]),
      (x = arrPatternSplat[0]),
      (tmpTernaryConsequent = x),
      tmpTernaryConsequent)
    : $tdz$__a;
  return a;
};
`````

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
  {
    let a;
    {
      let ifTestTmp = $tdz$__a === undefined;
      if (ifTestTmp) {
        arrAssignPatternRhs = 1;
        arrPatternSplat = [...arrAssignPatternRhs];
        x = arrPatternSplat[0];
        a = x;
      } else {
        a = $tdz$__a;
      }
    }
  }
  return a;
};
`````

## Uniformed

`````js filename=intro
var x = (x) => {
  var x;
  var x;
  var x;
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = 8;
        x = [...x];
        x = x[8];
        x = x;
      } else {
        x = x;
      }
    }
  }
  return x;
};
`````

## Output

`````js filename=intro
($tdz$__a) => {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  var x;
  let a;
  let ifTestTmp = $tdz$__a === undefined;
  if (ifTestTmp) {
    arrAssignPatternRhs = 1;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    a = x;
  } else {
    a = $tdz$__a;
  }
  return a;
};
`````

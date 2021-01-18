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
  {
    let a;
    {
      let ifTestTmp = $tdz$__a === undefined;
      if (ifTestTmp) {
        arrAssignPatternRhs = 1;
        arrPatternSplat = [...arrAssignPatternRhs];
        x = arrPatternSplat[0];
        a = arrAssignPatternRhs;
      } else {
        a = $tdz$__a;
      }
    }
  }
  return a;
};
`````

## Output

`````js filename=intro
($tdz$__a) => {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  let a;
  let ifTestTmp = $tdz$__a === undefined;
  if (ifTestTmp) {
    arrAssignPatternRhs = 1;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    a = arrAssignPatternRhs;
  } else {
    a = $tdz$__a;
  }
  return a;
};
`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same

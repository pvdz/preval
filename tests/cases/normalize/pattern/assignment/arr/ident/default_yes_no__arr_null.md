# Preval test case

# default_yes_no__arr_null.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x = $('pass')] = [null, 201]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = [null, 201];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
}
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = [/regex/, 8];
x = [...x];
x = x[8];
{
  var x = x * x;
  if (x) {
    x = x('str');
  } else {
    x = x;
  }
}
x(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = [null, 201];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
}
$(x);
`````

# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > arr > ident > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')]) {
  return 'bad';
}
$(f(null, 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  {
    let x;
    {
      let ifTestTmp = arrPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        x = $('fail');
      } else {
        x = arrPatternBeforeDefault;
      }
    }
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = x('str');
      } else {
        x = x;
      }
    }
  }
  return 'str';
}
var x;
x = x(/regex/, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 200);
$(tmpArg);
`````

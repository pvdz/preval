# Preval test case

# default_yes_no_no__undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  {
    let y;
    {
      let ifTestTmp = objPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        y = $('fail');
      } else {
        y = objPatternBeforeDefault;
      }
    }
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = x.x;
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
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

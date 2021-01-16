# Preval test case

# default_yes_no_no__obj_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } }) {
  return y;
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
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
        y = $('pass');
      } else {
        y = objPatternBeforeDefault;
      }
    }
  }
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 'abc', b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = $('pass');
  } else {
    y = objPatternBeforeDefault;
  }
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 'abc', b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

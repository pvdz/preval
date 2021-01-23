# Preval test case

# default_yes_no__obj_0.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') }) {
  return x;
}
$(f({ x: 0 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('fail');
    } else {
      x = objPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { x: 0 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { x: 0 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same

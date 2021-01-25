# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) }) {
  return y;
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = ['pass'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f(0, 10);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = ['pass'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg$1;
tmpArg$1 = f(0, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: ["pass"]
 - 1: ["pass"]
 - 2: undefined

Normalized calls: Same

Final output calls: Same

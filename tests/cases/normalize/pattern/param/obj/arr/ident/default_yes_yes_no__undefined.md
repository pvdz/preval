# Preval test case

# default_yes_yes_no__undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = ['fail2'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f(undefined, 10);
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
    tmpArg = ['fail2'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg$1;
tmpArg$1 = f(undefined, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same

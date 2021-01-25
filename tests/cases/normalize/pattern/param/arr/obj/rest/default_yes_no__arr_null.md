# Preval test case

# default_yes_no__arr_null.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return 'bad';
}
$(f([null, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = { a: 'fail' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let x = objPatternRest(arrPatternStep, [], undefined);
  return 'bad';
}
var tmpArg$1;
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = [null, 20, 30];
tmpArg$1 = f(tmpArg$2, 200);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = { a: 'fail' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  objPatternRest(arrPatternStep, [], undefined);
  return 'bad';
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = [null, 20, 30];
tmpArg$1 = f(tmpArg$2, 200);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'cannotDestructureThis' of null ]>

Normalized calls: Same

Final output calls: Same

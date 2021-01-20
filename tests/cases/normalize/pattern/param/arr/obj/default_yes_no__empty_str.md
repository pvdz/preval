# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > arr > obj > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('pass')]) {
  return 'ok';
}
$(f('', 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      arrPatternStep = $('pass');
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
  return 'ok';
}
var tmpArg;
tmpArg = f('', 100);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  return 'ok';
}
var tmpArg;
tmpArg = f('', 100);
$(tmpArg);
`````

## Result

Should call `$` with:
[['pass'], "<crash[ Cannot destructure '$(...)' as it is undefined. ]>"];

Normalized calls: BAD?!
[['pass'], ['ok'], null];

Final output calls: BAD!!
[['pass'], ['ok'], null];


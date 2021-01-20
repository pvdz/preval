# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { a: 'fail' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
const x = objPatternRest(arrPatternStep, []);
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const arrPatternSplat = [...1];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { a: 'fail' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
objPatternRest(arrPatternStep, []);
$('bad');
`````

## Result

Should call `$` with:
['<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same

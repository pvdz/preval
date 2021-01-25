# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = null;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternArrRoot = null;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { a: 'fail' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const x = objPatternRest(arrPatternStep, [], undefined);
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const arrPatternSplat = [...null];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { a: 'fail' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
objPatternRest(arrPatternStep, [], undefined);
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same

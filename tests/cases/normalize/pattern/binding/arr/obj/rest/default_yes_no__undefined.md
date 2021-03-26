# Preval test case

# default_yes_no__undefined.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = undefined;
$('bad');
`````

## Pre Normal

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = undefined;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 'fail' };
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$1 = arrPatternStep;
const tmpCalleeParam$3 = [];
const tmpCalleeParam$5 = undefined;
const x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...undefined];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { a: 'fail' };
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const tmpCalleeParam$1 = arrPatternStep;
const tmpCalleeParam$3 = [];
objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

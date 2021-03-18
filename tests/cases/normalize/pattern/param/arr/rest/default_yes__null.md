# Preval test case

# default_yes__null.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x] = $(['fail'])) {
  return 'bad';
}
$(f(null, 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [...x] = tmpParamDefault === undefined ? $(['fail']) : tmpParamDefault;
  return 'bad';
};
$(f(null, 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail'];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x = arrPatternSplat.slice(0);
  return 'bad';
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(null, 200);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...null];
arrPatternSplat.slice(0);
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

# Preval test case

# default_yes__arr_123.md

> Normalize > Pattern > Param > Arr > Default yes  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'ok';
}
$(f([1, 2, 3], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [] = tmpParamBare === undefined ? $('fail') : tmpParamBare;
  return 'ok';
};
$(f([1, 2, 3], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail');
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

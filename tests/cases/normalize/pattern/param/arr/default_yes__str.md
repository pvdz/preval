# Preval test case

# default_yes__str.md

> Normalize > Pattern > Param > Arr > Default yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'ok';
}
$(f('xyz', 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [] = tmpParamDefault === undefined ? $('fail') : tmpParamDefault;
  return 'ok';
};
$(f('xyz', 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail');
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCalleeParam = f('xyz', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail');
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  [...bindingPatternArrRoot];
  return 'ok';
};
const tmpCalleeParam = f('xyz', 200);
$(tmpCalleeParam);
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

# Preval test case

# default_yes__0.md

> Normalize > Pattern > Param > Arr > Default yes  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'bad';
}
$(f(0, 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [] = tmpParamDefault === undefined ? $('fail') : tmpParamDefault;
  return 'bad';
};
$(f(0, 200));
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
  return 'bad';
};
const tmpCallCallee = $;
const tmpCalleeParam = f(0, 200);
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
  return 'bad';
};
const tmpCalleeParam = f(0, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

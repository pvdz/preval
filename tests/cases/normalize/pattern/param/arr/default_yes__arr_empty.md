# Preval test case

# default_yes__arr_empty.md

> Normalize > Pattern > Param > Arr > Default yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('pass')) {
  return 'ok';
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [] = tmpParamDefault === undefined ? $('pass') : tmpParamDefault;
  return 'ok';
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('pass');
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('pass');
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  [...bindingPatternArrRoot];
  return 'ok';
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

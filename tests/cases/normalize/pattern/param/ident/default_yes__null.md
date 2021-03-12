# Preval test case

# default_yes__null.md

> Normalize > Pattern > Param > Ident > Default yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f(null, 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let x = tmpParamDefault === undefined ? 'fail' : tmpParamDefault;
  return x;
};
$(f(null, 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let x = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    x = 'fail';
    return x;
  } else {
    x = tmpParamDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    return 'fail';
  } else {
    return tmpParamDefault;
  }
};
const tmpCalleeParam = f(null, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

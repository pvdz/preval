# Preval test case

# convert_to_func2.md

> Normalize > Arrow > Convert to func2
>
> Regression

#TODO

## Input

`````js filename=intro
function f(x = false) {
  const y = function(s) { return x };
}
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = tmpParamBare === undefined ? false : tmpParamBare;
  const y = function ($$0) {
    let s = $$0;
    debugger;
    return x;
  };
};
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    x = false;
  } else {
    x = tmpParamBare;
  }
  const y = function ($$0) {
    let s = $$0;
    debugger;
    return x;
  };
  return undefined;
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

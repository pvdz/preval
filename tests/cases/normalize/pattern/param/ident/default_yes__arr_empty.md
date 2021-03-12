# Preval test case

# default_yes__arr_empty.md

> Normalize > Pattern > Param > Ident > Default yes  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let x = tmpParamDefault === undefined ? 'pass' : tmpParamDefault;
  return x;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let x = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    x = 'pass';
    return x;
  } else {
    x = tmpParamDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    return 'pass';
  } else {
    return tmpParamDefault;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

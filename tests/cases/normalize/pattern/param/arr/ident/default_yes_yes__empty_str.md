# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')] = $('fail2')) {
  return x;
}
$(f('', 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [x = $('pass')] = tmpParamDefault === undefined ? $('fail2') : tmpParamDefault;
  return x;
};
$(f('', 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail2');
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('pass');
    return x;
  } else {
    x = arrPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail2');
  } else {
    bindingPatternArrRoot = tmpParamDefault;
  }
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const SSA_x = $('pass');
    return SSA_x;
  } else {
    return arrPatternBeforeDefault;
  }
};
const tmpCalleeParam = f('', 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

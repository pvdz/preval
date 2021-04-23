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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [] = tmpParamBare === undefined ? $('pass') : tmpParamBare;
  return 'ok';
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    bindingPatternArrRoot = $('pass');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    bindingPatternArrRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    arrPatternSplat = [...bindingPatternArrRoot];
    return 'ok';
  };
  let arrPatternSplat = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = $('pass');
[...bindingPatternArrRoot];
$('ok');
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
